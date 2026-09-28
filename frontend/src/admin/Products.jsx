import React, { useEffect, useState } from 'react';
import { admin, products } from '../api/resources';

export default function Products() {
    const [d, setD] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);

   const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    price: '',
    compareAtPrice: '',
    stock: '',
    images: [],
    tags: '',
    featured: false
});

    const load = () =>
        products.list({ limit: 100 }).then(r => setD(r.data.data));

    const loadCategories = () =>
    products.categories().then(r => setCategories(r.data.data));

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
  load();
  loadCategories();
}, []);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = e => {
        setForm(prev => ({
            ...prev,
            images: Array.from(e.target.files).slice(0, 5)
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        setSaving(true);
        setMessage('');
        setError('');


        try {
            const formData = new FormData();

            const slug = form.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

            formData.append('name', form.name.trim());
            formData.append('slug', slug);
            formData.append('description', form.description.trim());
            formData.append('category', form.category.trim());
            formData.append('price', form.price);
            formData.append('stock', form.stock);
            formData.append('featured', form.featured);

            if (form.compareAtPrice !== '') {
                formData.append('compareAtPrice', form.compareAtPrice);
            }

            form.images.forEach(image => {
                formData.append('images', image);
            });

            if (form.tags) {
                form.tags
                    .split(',')
                    .map(tag => tag.trim())
                    .filter(Boolean)
                    .forEach(tag => {
                        formData.append('tags', tag);
                    });
            }

            await admin.createProduct(formData);

            setMessage('Product added successfully.');

            setForm({
                name: '',
                description: '',
                category: '',
                price: '',
                compareAtPrice: '',
                stock: '',
                images: [],
                tags: '',
                featured: false
            });

            await load();

            setTimeout(() => {
                setShowForm(false);
                setMessage('');
            }, 1000);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to add product.'
            );
        } finally {
            setSaving(false);
        }
    };

    const archiveProduct = async id => {
        await admin.deleteProduct(id);
        load();
    };

    return (
        <section className="admin-products">

            <div className="section-head">
                <div>
                    <span className="eyebrow">INVENTORY</span>
                    <h1>Products</h1>
                    <p className="muted">
                        Manage your Provoxi product catalog.
                    </p>
                </div>

                <button
                    className="btn"
                    onClick={() => {
                        setShowForm(!showForm);
                        setError('');
                        setMessage('');
                    }}
                >
                    {showForm ? 'Close' : '+ Add Product'}
                </button>
            </div>

            {showForm && (
                <div className="product-form-card">

                    <div className="form-header">
                        <div>
                            <span className="eyebrow">NEW PRODUCT</span>
                            <h2>Add Product</h2>
                            <p className="muted">
                                Add a new item to your Provoxi catalog.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group full">
                                <label>Product Name</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Premium Riding Gloves"
                                    required
                                />
                            </div>

                            <select
  name="category"
  value={form.category}
  onChange={handleChange}
  required
>
  <option value="">Select Category</option>

  {categories.map((category) => (
    <option key={category._id} value={category._id}>
      {category.name}
    </option>
  ))}
</select>

                            <div className="form-group">
                                <label>Stock</label>
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
                                <label>Price (₹)</label>
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
                                <label>Compare At Price (₹)</label>
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
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe the product..."
                                    rows="5"
                                    required
                                />
                            </div>

                            {/* IMAGE UPLOAD */}

                            <div className="form-group full">
                                <label>Product Images</label>

                                <div className="image-upload-box">

                                    <input
                                        type="file"
                                        name="images"
                                        accept="image/png,image/jpeg,image/webp"
                                        multiple
                                        onChange={handleImageChange}
                                    />

                                    <strong>
                                        Upload Product Images
                                    </strong>

                                    <small>
                                        JPG, PNG or WEBP · Maximum 5 images
                                    </small>

                                </div>

                                {form.images.length > 0 && (
                                    <div className="selected-images">

                                        {form.images.map((image, index) => (
                                            <div
                                                className="image-preview"
                                                key={index}
                                            >
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Preview ${index + 1}`}
                                                />
                                            </div>
                                        ))}

                                    </div>
                                )}

                            </div>

                            <div className="form-group full">
                                <label>Tags</label>

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
                                    <strong>Featured Product</strong>

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
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn"
                                disabled={saving}
                            >
                                {saving ? 'Uploading...' : 'Add Product'}
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
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Active</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        {d.map(p => (
                            <tr key={p._id}>

                                <td>
                                    <strong>{p.name}</strong>
                                </td>

                                <td>₹{p.price}</td>

                                <td>{p.stock}</td>

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
                                    <button
                                        className="link-btn"
                                        onClick={() =>
                                            archiveProduct(p._id)
                                        }
                                    >
                                        Archive
                                    </button>
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </section>
    );
}