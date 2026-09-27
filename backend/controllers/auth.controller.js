import User from '../models/User.js'; 
import {AppError} from '../utils/appError.js';
 import {makeHash,compareHash,issueAuth,setAuthCookies,clearAuthCookies,hashToken} from '../services/token.service.js'; 
 import {signAccess,verifyRefresh} from '../utils/jwt.js'; 
 import {env} from '../config/env.js'; 
 import crypto from 'crypto';
export async function register(req,res){
    const {name,email,password}=req.body;
    if(await User.exists({email}))
        throw new AppError('Email already registered',409,'EMAIL_EXISTS');
    const user=await User.create({name,email,passwordHash:await makeHash(password)});
    const tokens=await issueAuth(user);setAuthCookies(res,tokens);
    res.status(201).json({success:true,message:'Account created',data:{user:{id:user._id,name:user.name,email:user.email,role:user.role}}});}

export async function login(req,res){
    const {email,password}=req.body;const user=await User.findOne({email}).select('+passwordHash');if(!user||!(await compareHash(password,user.passwordHash)))
        throw new AppError('Invalid credentials',401,'INVALID_CREDENTIALS');
    if(!user.isActive)throw new AppError('Account disabled',403,'ACCOUNT_DISABLED');
    const tokens=await issueAuth(user);setAuthCookies(res,tokens);res.json({success:true,message:'Logged in',data:{user:{id:user._id,name:user.name,email:user.email,role:user.role}}});}

export async function refresh(req,res){
    const token=req.cookies.refreshToken;if(!token)
        throw new AppError('Refresh token required',401);
    const p=verifyRefresh(token);const user=await User.findById(p.sub).select('+refreshTokenHash');if(!user||!user.refreshTokenHash||user.refreshTokenHash!==hashToken(token))
        throw new AppError('Invalid refresh token',401);const tokens=await issueAuth(user);setAuthCookies(res,tokens);res.json({success:true,message:'Refreshed'});}

export async function logout(req,res){
    if(req.user){req.user.refreshTokenHash=undefined;
        await req.user.save();}clearAuthCookies(res);
        res.json({success:true,message:'Logged out'});}

export async function me(req,res){res.json({success:true,data:{user:{id:req.user._id,name:req.user.name,email:req.user.email,role:req.user.role,isEmailVerified:req.user.isEmailVerified}}});}


export async function requestReset(req,res){
    const user=await User.findOne({email:req.body.email});
    if(user){const token=crypto.randomBytes(32).toString('hex');
        user.resetTokenHash=hashToken(token);user.resetExpires=new Date(Date.now()+30*60*1000);
        await user.save();console.log(`Password reset token for ${user.email}: ${token}`);}
        res.json({success:true,message:'If the account exists, reset instructions were generated.'});}

export async function resetPassword(req,res){
    const user=await User.findOne({resetTokenHash:hashToken(req.body.token),
        resetExpires:{$gt:new Date()}}).select('+passwordHash');
        if(!user)throw new AppError('Invalid or expired reset token',400);
        user.passwordHash=await makeHash(req.body.password);
        user.resetTokenHash=undefined;user.resetExpires=undefined;
        user.refreshTokenHash=undefined;await user.save();clearAuthCookies(res);
        res.json({success:true,message:'Password reset'});}
