export default function Flag({ code, size = 40 }) {
    return (
        <img
            src={`https://cdn.jsdelivr.net/npm/flagkit-svg@2.0.0/dist/${code}.svg`}
            alt={code}
            width={size}
            height={size}
        />
    );
}