import { useState, useRef, useEffect } from 'react';
import './CategoryDropdown.css';

function CategoryDropdown({ value, options, onChange, label = 'Category' }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selected = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open]);

  function handleSelect(optionValue) {
    onChange(optionValue);
    setOpen(false);
  }

  return (
    <div className="category-dropdown" ref={containerRef}>
      <button
        type="button"
        className={`category-dropdown-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${selected.label}`}
      >
        <span className="category-dropdown-label">{label}</span>
        <span className="category-dropdown-value">{selected.label}</span>
        <span className="category-dropdown-chevron" aria-hidden="true" />
      </button>

      {open && (
        <>
          <div
            className="category-dropdown-overlay"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <ul className="category-dropdown-menu" role="listbox" aria-label={label}>
            {options.map((option) => (
              <li key={option.value} role="option" aria-selected={value === option.value}>
                <button
                  type="button"
                  className={`category-dropdown-option ${
                    value === option.value ? 'selected' : ''
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                  {value === option.value && (
                    <span className="category-dropdown-check" aria-hidden="true">
                      &#10003;
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default CategoryDropdown;
