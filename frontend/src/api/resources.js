import api from './client';




export const auth = {
    register: d => api.post('/auth/register', d),
    login: d => api.post('/auth/login', d),
    logout: () => api.post('/auth/logout'),
    me: () => api.get('/auth/me'),
    forgot: d => api.post('/auth/forgot-password', d),
    reset: d => api.post('/auth/reset-password', d)
};



export const products = {
    list: params => api.get('/products', { params }),

    get: id =>
        api.get(`/products/${id}`),

    categories: () =>
        api.get('/products/categories')
};



export const cart = {
    get: () =>
        api.get('/cart'),

    add: data =>
        api.post('/cart/items', data),

    update: (id, data) =>
        api.patch(`/cart/items/${id}`, data),

    remove: id =>
        api.delete(`/cart/items/${id}`)
};




export const wishlist = {
    get: () =>
        api.get('/wishlist'),

    toggle: id =>
        api.post(`/wishlist/${id}/toggle`)
};




export const reviews = {
    list: id =>
        api.get(`/reviews/product/${id}`),

    create: (id, data) =>
        api.post(`/reviews/product/${id}`, data),

    remove: id =>
        api.delete(`/reviews/${id}`)
};



export const addresses = {
    list: () =>
        api.get('/addresses'),

    create: data =>
        api.post('/addresses', data),

    remove: id =>
        api.delete(`/addresses/${id}`)
};




export const orders = {
    list: () =>
        api.get('/orders'),

    get: id =>
        api.get(`/orders/${id}`),

    create: data =>
        api.post('/orders', data),

    verify: data =>
        api.post('/orders/payment/verify', data)
};




export const notifications = {
    list: () =>
        api.get('/notifications'),

    read: id =>
        api.patch(`/notifications/${id}/read`)
};




export const admin = {

    dashboard: () =>
        api.get('/admin/dashboard'),

    users: () =>
        api.get('/admin/users'),

    setUserStatus: (id, data) =>
        api.patch(`/admin/users/${id}/status`, data),

    reviews: () =>
        api.get('/admin/reviews'),

    moderateReview: (id, data) =>
        api.patch(`/admin/reviews/${id}`, data),

    coupons: () =>
        api.get('/admin/coupons'),

    createCoupon: data =>
        api.post('/admin/coupons', data),

    createProduct: data =>
        api.post('/products', data),

    updateProduct: (id, data) =>
        api.patch(`/products/${id}`, data),

    deleteProduct: id =>
        api.delete(`/products/${id}`),

    deleteCoupon: id =>
    api.delete(`/admin/coupons/${id}`),
};