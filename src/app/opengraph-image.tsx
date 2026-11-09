import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Vicky Hernandez Private Wealth - Personalized Fiduciary Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #070E1A 0%, #0F1D33 50%, #070E1A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          padding: '60px',
          border: '12px solid #C59B47',
          position: 'relative',
        }}
      >
        {/* Subtle decorative gold inner frame */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            border: '1px solid rgba(197, 155, 71, 0.3)',
            display: 'flex',
          }}
        />

        {/* Monogram Crest */}
        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '48px',
            background: 'linear-gradient(135deg, #112240 0%, #070E1A 100%)',
            border: '3px solid #C59B47',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontSize: '40px',
              fontWeight: 'bold',
              color: '#E6CA85',
              letterSpacing: '-2px',
              fontFamily: 'serif',
            }}
          >
            VH
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 'bold',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '6px',
            fontFamily: 'serif',
          }}
        >
          Vicky Hernandez
        </div>

        {/* Sub-heading */}
        <div
          style={{
            fontSize: '20px',
            fontWeight: '600',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            color: '#C59B47',
            marginBottom: '26px',
          }}
        >
          Private Wealth Management
        </div>

        {/* Personalized Description */}
        <div
          style={{
            fontSize: '24px',
            color: '#E2E8F0',
            textAlign: 'center',
            maxWidth: '920px',
            lineHeight: 1.4,
            marginBottom: '32px',
          }}
        >
          Personalized Fiduciary Portfolio & Wealth Preservation Architecture
        </div>

        {/* Custodian Provenance Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(6, 78, 59, 0.5)',
            border: '1px solid rgba(16, 185, 129, 0.6)',
            borderRadius: '40px',
            padding: '10px 32px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '6px',
              background: '#34D399',
              marginRight: '12px',
            }}
          />
          <span
            style={{
              fontSize: '18px',
              color: '#A7F3D0',
              fontWeight: '600',
              letterSpacing: '1px',
            }}
          >
            Verified Institutional Custody: Northern Trust Global Custody
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
