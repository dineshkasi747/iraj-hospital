export default function Loading() {
  return (
    <div className="iraj-loader-overlay">
      <div className="iraj-loader-lockup">
        {/* Left: Glowing IRAJ Emblem */}
        <div className="iraj-loader-emblem">
          <img
            src="/images/iraj-logo.png"
            alt="IRAJ Hospital Emblem"
          />
        </div>

        {/* Right: Hospital Title & Accent Tagline */}
        <div className="iraj-loader-text">
          <div className="iraj-loader-title">
            IRAJ HOSPITAL
          </div>
          <div className="iraj-loader-tagline">
            <div className="iraj-loader-line" />
            <span className="iraj-loader-subtitle">
              THE CARE YOU CAN TRUST
            </span>
            <div className="iraj-loader-line right" />
          </div>
        </div>
      </div>
    </div>
  );
}
