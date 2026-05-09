// Real-photography ingredient inside a perfect circular mask.
// Uses the `image` field on each ingredient (PNG-served Unsplash CDN).
export default function IngredientImage({ ingredient, size = 64, className = "" }) {
  return (
    <span
      className={`relative inline-block overflow-hidden rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: "var(--color-paper-soft)",
        boxShadow: "inset 0 0 0 1px rgba(10,10,10,0.06)",
      }}
      aria-hidden
    >
      <img
        src={ingredient.image}
        alt=""
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </span>
  );
}
