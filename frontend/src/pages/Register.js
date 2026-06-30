import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const result = await register(formData);

    if (!result.success) {
      const fieldErrors = {};
      (result.error || []).forEach((err) => {
        if (err.field) {
          fieldErrors[err.field] = err.message;
        }
      });
      if (Object.keys(fieldErrors).length === 0) {
        fieldErrors.general = 'Registration failed. Please try again.';
      }
      setErrors(fieldErrors);
      setSubmitting(false);
      return;
    }

    navigate('/products');
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="auth-subtitle">Join Simply Buy and start shopping</p>

        {errors.general && (
          <div className="alert alert-error">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                className={`form-input ${errors.first_name ? 'is-invalid' : ''}`}
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              {errors.first_name && (
                <div className="form-error">{errors.first_name}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                className={`form-input ${errors.last_name ? 'is-invalid' : ''}`}
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              {errors.last_name && (
                <div className="form-error">{errors.last_name}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className={`form-input ${errors.username ? 'is-invalid' : ''}`}
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
            {errors.username && (
              <div className="form-error">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className={`form-input ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            {errors.password && (
              <div className="form-error">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg auth-submit"
            disabled={submitting}
          >
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
