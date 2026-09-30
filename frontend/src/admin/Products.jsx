import React, { useEffect, useState } from 'react';
import { admin, products } from '../api/resources';

const emptyForm = {
    name: '',
    slug: '',
    description: '',
    bike: '',
    category: '',
    price: '',
    compareAtPrice: '',
    stock: '',
    images: [],
    tags: '',
    featured: false
};

const bikes = [
    { name: 'Royal Enfield', value: 'royal-enfield' },
    { name: 'KTM', value: 'ktm' },
    { name: 'Yamaha', value: 'yamaha' },
    { name: 'Honda', value: 'honda' },
    { name: 'Bajaj', value: 'bajaj' },
    { name: 'Hero', value: 'hero' },
    { name: 'Triumph', value: 'triumph' },
    { name: 'TVS', value: 'tvs' }
];

export default function Products() {
    const [d, setD] = useState([]);
    const [categories, setCategories] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [form, setForm] = useState(emptyForm);

    const load = async () => {
        try {
            const r = await products.list({
                limit: 100
            });

            setD(r.data?.data || []);
        } catch (err) {
            console.error(
                'Failed to load products:',
                err
            );

            setD([]);
        }
    };

   const loadCategories = async () => {
    console.log('🔥 LOAD CATEGORIES START');

    try {
        const r = await products.categories();

        console.log('🔥 CATEGORY RESPONSE:', r.data);

        setCategories(
            r.data?.data || []
        );
    } catch (err) {
        console.error(
            '❌ Failed to load categories:',
            err
        );

        setCategories([]);
    }
};

    useEffect(() => {
        load();
        loadCategories();
    }, []);

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value
        }));
    };

    const handleImageChange = (e) => {
        setForm((prev) => ({
            ...prev,
            images: Array.from(
                e.target.files
            ).slice(0, 5)
        }));
    };

    const resetForm = () => {
        setForm({
            ...emptyForm,
            images: []
        });

        setEditingId(null);
    };

    const editProduct = (product) => {
        setEditingId(product._id);

        const categoryId =
            product.category?._id ||
            product.category ||
            '';

        setForm({
            name: product.name || '',
            slug: product.slug || '',
            description:
                product.description || '',
            bike: product.bike || '',
            category: categoryId,
            price:
                product.price ?? '',
            compareAtPrice:
                product.compareAtPrice ?? '',
            stock:
                product.stock ?? '',
            images: [],
            tags:
                Array.isArray(product.tags)
                    ? product.tags.join(', ')
                    : '',
            featured:
                Boolean(product.featured)
        });

        setShowForm(true);
        setError('');
        setMessage('');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setMessage('');
        setError('');

        try {
            const formData =
                new FormData();

            const slug = form.name
                .toLowerCase()
                .trim()
                .replace(
                    /[^a-z0-9]+/g,
                    '-'
                )
                .replace(
                    /^-|-$/g,
                    ''
                );

            formData.append(
                'name',
                form.name.trim()
            );

            formData.append(
                'slug',
                slug
            );

            formData.append(
                'description',
                form.description.trim()
            );

            formData.append(
                'bike',
                form.bike
            );

            formData.append(
                'category',
                form.category
            );

            formData.append(
                'price',
                form.price
            );

            formData.append(
                'stock',
                form.stock
            );

            formData.append(
                'featured',
                form.featured
            );

            if (
                form.compareAtPrice !== ''
            ) {
                formData.append(
                    'compareAtPrice',
                    form.compareAtPrice
                );
            }

            form.images.forEach(
                (image) => {
                    formData.append(
                        'images',
                        image
                    );
                }
            );

            if (form.tags) {
                form.tags
                    .split(',')
                    .map(
                        (tag) =>
                            tag.trim()
                    )
                    .filter(Boolean)
                    .forEach(
                        (tag) => {
                            formData.append(
                                'tags',
                                tag
                            );
                        }
                    );
            }

            if (editingId) {
                await admin.updateProduct(
                    editingId,
                    formData
                );

                setMessage(
                    'Product updated successfully.'
                );
            } else {
                await admin.createProduct(
                    formData
                );

                setMessage(
                    'Product added successfully.'
                );
            }

            resetForm();

            await load();

            setTimeout(() => {
                setShowForm(false);
                setMessage('');
            }, 1000);
        } catch (err) {
            console.error(
                'Product save error:',
                err
            );

            setError(
                err.response?.data?.message ||
                'Failed to save product.'
            );
        } finally {
            setSaving(false);
        }
    };

    const archiveProduct = async (id) => {
        try {
            await admin.deleteProduct(id);
            await load();
        } catch (err) {
            console.error(
                'Failed to archive product:',
                err
            );
        }
    };

    const cancelForm = () => {
        resetForm();
        setShowForm(false);
        setError('');
        setMessage('');
    };

    return (
        <section className="admin-products">

            <div className="section-head">

                <div>

                    <span className="eyebrow">
                        INVENTORY
                    </span>

                    <h1>
                        Products
                    </h1>

                    <p className="muted">
                        Manage your Provoxi
                        product catalog.
                    </p>

                </div>

                <button
                    className="btn"
                    onClick={() => {
                        if (showForm) {
                            cancelForm();
                        } else {
                            resetForm();
                            setShowForm(true);
                        }
                    }}
                >
                    {showForm
                        ? 'Close'
                        : '+ Add Product'}
                </button>

            </div>

            {showForm && (

                <div className="product-form-card">

                    <div className="form-header">

                        <div>

                            <span className="eyebrow">
                                {editingId
                                    ? 'EDIT PRODUCT'
                                    : 'NEW PRODUCT'}
                            </span>

                            <h2>
                                {editingId
                                    ? 'Update Product'
                                    : 'Add Product'}
                            </h2>

                            <p className="muted">
                                {editingId
                                    ? 'Update the existing product details.'
                                    : 'Add a new item to your Provoxi catalog.'}
                            </p>

                        </div>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group full">

                                <label>
                                    Product Name
                                </label>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Royal Enfield Classic 350 Crash Guard"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Bike
                                </label>

                                <select
                                    name="bike"
                                    value={form.bike}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Bike
                                    </option>

                                    {bikes.map(
                                        (bike) => (
                                            <option
                                                key={bike.value}
                                                value={bike.value}
                                            >
                                                {bike.name}
                                            </option>
                                        )
                                    )}

                                </select>

                            </div>

                            <div className="form-group">

                                <label>
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    {categories.map(
                                        (category) => (
                                            <option
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.name}
                                            </option>
                                        )
                                    )}

                                </select>

                            </div>

                            <div className="form-group">

                                <label>
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    name="stock"
                                    value={form.stock}
                                    onChange={handleChange}
                                    placeholder="100"
                                    min="0"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Price (₹)
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="1499"
                                    min="0"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Compare At Price (₹)
                                </label>

                                <input
                                    type="number"
                                    name="compareAtPrice"
                                    value={form.compareAtPrice}
                                    onChange={handleChange}
                                    placeholder="1999"
                                    min="0"
                                />

                            </div>

                            <div className="form-group full">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe the product..."
                                    rows="5"
                                    required
                                />

                            </div>

                            <div className="form-group full">

                                <label>
                                    Product Images
                                </label>

                                <div className="image-upload-box">

                                    <input
                                        type="file"
                                        name="images"
                                        accept="image/png,image/jpeg,image/webp"
                                        multiple
                                        onChange={handleImageChange}
                                    />

                                    <strong>
                                        {editingId
                                            ? 'Upload New Images'
                                            : 'Upload Product Images'}
                                    </strong>

                                    <small>
                                        JPG, PNG or WEBP · Maximum 5 images
                                    </small>

                                </div>

                                {form.images.length > 0 && (

                                    <div className="selected-images">

                                        {form.images.map(
                                            (image, index) => (

                                                <div
                                                    className="image-preview"
                                                    key={index}
                                                >

                                                    <img
                                                        src={URL.createObjectURL(
                                                            image
                                                        )}
                                                        alt={`Preview ${
                                                            index + 1
                                                        }`}
                                                    />

                                                </div>

                                            )
                                        )}

                                    </div>

                                )}

                            </div>

                            <div className="form-group full">

                                <label>
                                    Tags
                                </label>

                                <input
                                    name="tags"
                                    value={form.tags}
                                    onChange={handleChange}
                                    placeholder="helmet, riding, safety"
                                />

                                <small>
                                    Separate tags with commas.
                                </small>

                            </div>

                            <label className="featured-toggle">

                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={form.featured}
                                    onChange={handleChange}
                                />

                                <span>

                                    <strong>
                                        Featured Product
                                    </strong>

                                    <small>
                                        Show this product as a featured item.
                                    </small>

                                </span>

                            </label>

                        </div>

                        {message && (

                            <div className="form-success">
                                ✓ {message}
                            </div>

                        )}

                        {error && (

                            <div className="form-error">
                                {error}
                            </div>

                        )}

                        <div className="form-actions">

                            <button
                                type="button"
                                className="btn secondary"
                                onClick={cancelForm}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn"
                                disabled={saving}
                            >
                                {saving
                                    ? 'Saving...'
                                    : editingId
                                        ? 'Update Product'
                                        : 'Add Product'}
                            </button>

                        </div>

                    </form>

                </div>

            )}

            <div className="table-wrap">

                <table>

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Bike</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Active</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {d.map(
                            (p) => (

                                <tr key={p._id}>

                                    <td>
                                        <strong>
                                            {p.name}
                                        </strong>
                                    </td>

                                    <td>
                                        {p.bike}
                                    </td>

                                    <td>
                                        {p.category?.name ||
                                            p.category ||
                                            '-'}
                                    </td>

                                    <td>
                                        ₹{p.price}
                                    </td>

                                    <td>
                                        {p.stock}
                                    </td>

                                    <td>

                                        <span
                                            className={`status ${
                                                p.isActive
                                                    ? 'active'
                                                    : 'inactive'
                                            }`}
                                        >
                                            {p.isActive
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>

                                    </td>

                                    <td>

                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '10px'
                                            }}
                                        >

                                            <button
                                                className="link-btn"
                                                onClick={() =>
                                                    editProduct(
                                                        p
                                                    )
                                                }
                                            >
                                                Update
                                            </button>

                                            <button
                                                className="link-btn"
                                                onClick={() =>
                                                    archiveProduct(
                                                        p._id
                                                    )
                                                }
                                            >
                                                Archive
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </section>
    );
}
