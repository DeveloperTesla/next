// src/components/content/Logo.tsx
"use client";

const Logo = () => (
    <svg
        height="100%"
        width="100%"
        viewBox="0 0 256 256"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g transform="matrix(1,0,0,1,-1.66667,-1.66667)">
            <g transform="matrix(0.987448,0,0,0.987448,-6.78661,-4.81172)">
                <circle
                    cx="136.5"
                    cy="134.5"
                    r="119.5"
                    style={{
                        fill: "rgb(10,10,10)",
                        stroke: "rgb(250,250,250)",
                        strokeWidth: "16.88px",
                    }}
                />
            </g>
            <g transform="matrix(1,0,0,1,-15.25,44.6846)">
                <g transform="matrix(150,0,0,150,87,135.815)">
                    <path
                        d="M0.06,-0.7L0.48,-0.7C0.55,-0.7 0.601,-0.684 0.632,-0.652C0.664,-0.621 0.68,-0.57 0.68,-0.5L0.68,-0.41C0.68,-0.355 0.671,-0.312 0.652,-0.281C0.634,-0.25 0.605,-0.23 0.565,-0.22L0.69,-0L0.495,-0L0.38,-0.21L0.24,-0.21L0.24,-0L0.06,-0L0.06,-0.7ZM0.5,-0.5C0.5,-0.54 0.48,-0.56 0.44,-0.56L0.24,-0.56L0.24,-0.35L0.44,-0.35C0.48,-0.35 0.5,-0.37 0.5,-0.41L0.5,-0.5Z"
                        style={{
                            fill: "rgb(250,250,250)",
                            fillRule: "nonzero",
                        }}
                    />
                </g>
            </g>
        </g>
        <style jsx>{`
            svg {
                mask-image: linear-gradient(
                    60deg,
                    black 25%,
                    rgba(0, 0, 0, 0.2) 50%,
                    black 75%
                );
                mask-size: 400%;
                mask-position: 0%;
            }
            svg:hover {
                mask-position: 100%;
                transition:
                    mask-position 1s ease,
                    -webkit-mask-position 1s ease;
            }
        `}</style>
    </svg>
);

export default Logo;
