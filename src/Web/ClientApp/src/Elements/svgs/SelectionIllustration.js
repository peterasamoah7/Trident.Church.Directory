import * as React from "react";

const SvgSelectionIllustration = (props) => (
  <svg
    width={150}
    height={153}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M75 150c41.421 0 75-33.579 75-75S116.421 0 75 0 0 33.579 0 75s33.579 75 75 75Z"
      fill="url(#selectionIllustration_svg__a)"
    />
    <g filter="url(#selectionIllustration_svg__b)">
      <mask
        id="selectionIllustration_svg__d"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={150}
        height={150}
      >
        <path
          d="M75 150c41.421 0 75-33.579 75-75S116.421 0 75 0 0 33.579 0 75s33.579 75 75 75Z"
          fill="url(#selectionIllustration_svg__c)"
        />
      </mask>
      <g mask="url(#selectionIllustration_svg__d)">
        <path
          d="M118 43H32a5 5 0 0 0-5 5v105a5 5 0 0 0 5 5h86a5 5 0 0 0 5-5V48a5 5 0 0 0-5-5Z"
          fill="#fff"
        />
      </g>
    </g>
    <path
      d="M66 53H40a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Zm0 42H40a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
      fill="#E1EBFA"
    />
    <path
      d="M108 68H42a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h66a4 4 0 0 0 4-4V72a4 4 0 0 0-4-4Z"
      stroke="#1485FD"
      strokeWidth={2}
    />
    <path
      d="M108 109H42a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h66a5 5 0 0 0 5-5v-8a5 5 0 0 0-5-5Z"
      fill="#DFEAFB"
    />
    <path d="M53 32a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#fff" />
    <path d="M75 32a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#1485FD" />
    <path d="M97 32a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#fff" />
    <path d="M86 88a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill="#DFEAFB" />
    <path
      d="M89.907 104.37c-.8 0-1.547 0-2.227-.043a4.567 4.567 0 0 1-3.884-2.749l-4.219-8.338a1.8 1.8 0 0 1 .182-2.53 1.628 1.628 0 0 1 1.035-.358 1.916 1.916 0 0 1 1.437.714l1.916 2.615.029.034V83.78a1.859 1.859 0 0 1 3.717 0v6.5a1.729 1.729 0 1 1 3.444 0v1.355a1.729 1.729 0 1 1 3.444 0v1.044a1.729 1.729 0 1 1 3.444 0v6.337c-.034 1.949-.915 5.235-4.014 5.235-.225.01-2.131.12-4.3.12l-.004-.001Z"
      fill="#1485FD"
      stroke="#fff"
    />
    <defs>
      <linearGradient
        id="selectionIllustration_svg__a"
        x1={75}
        y1={0}
        x2={75}
        y2={150}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E3ECFA" />
        <stop offset={1} stopColor="#DAE7FF" />
      </linearGradient>
      <linearGradient
        id="selectionIllustration_svg__c"
        x1={75}
        y1={0}
        x2={75}
        y2={150}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E3ECFA" />
        <stop offset={1} stopColor="#DAE7FF" />
      </linearGradient>
      <filter
        id="selectionIllustration_svg__b"
        x={21}
        y={34}
        width={108}
        height={119}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={-3} />
        <feGaussianBlur stdDeviation={3} />
        <feColorMatrix values="0 0 0 0 0.788235 0 0 0 0 0.803922 0 0 0 0 0.85098 0 0 0 0.349 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_189_1373"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_189_1373"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default SvgSelectionIllustration;
