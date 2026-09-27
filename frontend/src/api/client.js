import axios from 'axios';
const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'http://localhost:5000/api',withCredentials:true});

let refreshing=false,queue=[];function flush(error){queue.forEach(({resolve,reject})=>error?reject(error):resolve());queue=[];}

api.interceptors.response.use(r=>r,async error=>{
    const cfg=error.config;
    if(![
    '/auth/login',
    '/auth/register',
    '/auth/refresh',
    '/auth/logout'
].includes(cfg.url)){
        cfg._retry=true;if(!refreshing){
            refreshing=true;
            try{
                await api.post('/auth/refresh');
                flush();
                return api(cfg);
            }catch(e){
                flush(e);
                throw e}
                finally{refreshing=false}}
                return new Promise((resolve,reject)=>queue.push({
                    resolve:()=>resolve(api(cfg)),reject}));
                }throw error;
            });
            
            export default api;
