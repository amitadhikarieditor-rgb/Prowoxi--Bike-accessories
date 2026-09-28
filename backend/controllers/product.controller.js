import Product from '../models/Product.js';
 import Category from '../models/Category.js';
import {AppError} from '../utils/appError.js'; 
import {pagination} from '../utils/pagination.js'; 
import {cache} from '../services/cache.service.js';

export async function list(req,res){
    const {page,limit,skip}=pagination(req.query);
    const key=`products:${JSON.stringify(req.query)}`
    ;const cached=await cache.get(key);
    if(cached)return res.json(cached);

    const filter={isActive:true};

    if (req.query.bike)
    filter.bike = req.query.bike;

    if(req.query.category)
        filter.category=req.query.category;
    if(req.query.minPrice)
        filter.price={
    $gte:Number(req.query.minPrice)};
    if(req.query.maxPrice)filter.price={...(filter.price||{}),
    $lte:Number(req.query.maxPrice)};if(req.query.featured==='true')
        filter.featured=true;if(req.query.q)filter.$text={$search:req.query.q};
    let sort={createdAt:-1};
    if(req.query.sort==='price_asc')sort={price:1};
    if(req.query.sort==='price_desc')sort={price:-1};
    if(req.query.sort==='rating')sort={ratingAverage:-1};
    const [data,total]=await Promise.all([Product.find(filter).populate('category','name slug').sort(sort).skip(skip).limit(limit).lean(),
        Product.countDocuments(filter)]);
        const payload={success:true,data,pagination:{page,limit,total,totalPages:Math.ceil(total/limit)}};
        await cache.set(key,payload,45);res.json(payload);}

export async function getOne(req,res){
    const p=await Product.findOne({_id:req.params.id,isActive:true}).populate('category');
    if(!p)throw new AppError('Product not found',404,'PRODUCT_NOT_FOUND');res.json({success:true,data:p});}

export async function adminCreate(req, res) {

    const imageUrls = req.files?.map(file => file.path) || [];

    const p = await Product.create({
        ...req.body,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        compareAtPrice: req.body.compareAtPrice
            ? Number(req.body.compareAtPrice)
            : undefined,
        images: imageUrls,
        featured: req.body.featured === 'true'
    });

    await cache.del('products:*');

    res.status(201).json({
        success: true,
        message: 'Product created',
        data: p
    });
}

export async function adminUpdate(req, res) {

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new AppError(
            'Product not found',
            404,
            'PRODUCT_NOT_FOUND'
        );
    }

    const updates = {
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        bike: req.body.bike,
        category: req.body.category,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        featured: req.body.featured === 'true'
    };

    if (req.body.compareAtPrice !== undefined) {
        updates.compareAtPrice =
            req.body.compareAtPrice === ''
                ? undefined
                : Number(req.body.compareAtPrice);
    }

    if (req.body.tags !== undefined) {
        updates.tags = Array.isArray(req.body.tags)
            ? req.body.tags
            : [req.body.tags];
    }
    if (req.files?.length) {
        updates.images = req.files.map(file => file.path);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updates,
        {
            new: true,
            runValidators: true
        }
    );

    await cache.del('products:*');

    res.json({
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct
    });
}

export async function adminDelete(req,res){
    await Product.findByIdAndUpdate(req.params.id,{isActive:false});
    res.json({success:true,message:'Product archived'});}

export async function categories(req,res){
    const data=await Category.find({isActive:true}).sort('name').lean();res.json({success:true,data});}
    