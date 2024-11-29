import React, { useEffect, useRef, useState } from 'react';

export function ImageFrame({ image, onLoad }) {
  const frameRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateFrameDimensions = () => {
      const container = frame.parentElement;
      const containerAspect = container.clientWidth / container.clientHeight;
      const imageAspect = image.imageDimensions.width / image.imageDimensions.height;

      let frameWidth, frameHeight;

      if (containerAspect > imageAspect) {
        frameHeight = container.clientHeight;
        frameWidth = frameHeight * imageAspect;
      } else {
        frameWidth = container.clientWidth;
        frameHeight = frameWidth / imageAspect;
      }

      setDimensions({ width: frameWidth, height: frameHeight });
      if (onLoad) onLoad({ width: frameWidth, height: frameHeight });
    };

    const resizeObserver = new ResizeObserver(updateFrameDimensions);
    resizeObserver.observe(frame.parentElement);
    updateFrameDimensions();

    return () => resizeObserver.disconnect();
  }, [image.imageDimensions, onLoad]);

  return (
    <div
      ref={frameRef}
      className="relative"
      style={{
        width: dimensions.width,
        height: dimensions.height
      }}
    >
      <img
        src={image.imageUrl}
        alt="Vehicle damage"
        className="absolute inset-0 w-full h-full object-contain"
      />
      {image.damageInfo?.map((damage, index) => (
        <DamageBox
          key={index}
          damage={damage}
          imageDimensions={image.imageDimensions}
          frameDimensions={dimensions}
        />
      ))}
    </div>
  );
}

function DamageBox({ damage, imageDimensions, frameDimensions }) {
  const { x, y, width, height } = damage.coordinates || {};
  if (!x || !y || !width || !height) return null;

  const scaleX = frameDimensions.width / imageDimensions.width;
  const scaleY = frameDimensions.height / imageDimensions.height;

  const getDamageColor = (damageType) => {
    // Convert string to number if needed
    const type = typeof damageType === 'string' ? parseInt(damageType, 10) : damageType;
    
    switch (type) {
      case 0:
        return '#22c55e'; // green for scratch
      case 1:
        return '#eab308'; // yellow for dent
      case 2:
        return '#ef4444'; // red for broken
      default:
        return '#22c55e'; // default to green
    }
  };

  const getDamageLabel = (damageType) => {
    // Convert string to number if needed
    const type = typeof damageType === 'string' ? parseInt(damageType, 10) : damageType;
    
    switch (type) {
      case 0:
        return 'Scratch';
      case 1:
        return 'Dent';
      case 2:
        return 'Broken';
      default:
        return `Type ${damageType}`; // Show actual type if unknown
    }
  };

  // Calculate scaled positions
  const scaledX = Math.round(x * scaleX);
  const scaledY = Math.round(y * scaleY);
  const scaledWidth = Math.round(width * scaleX);
  const scaledHeight = Math.round(height * scaleY);

  const boxStyle = {
    left: `${scaledX}px`,
    top: `${scaledY}px`,
    width: `${scaledWidth}px`,
    height: `${scaledHeight}px`,
    position: 'absolute',
    border: `2px solid ${getDamageColor(damage.damageType)}`,
    boxSizing: 'border-box',
    pointerEvents: 'none'
  };

  const labelStyle = {
    position: 'absolute',
    top: '-24px',
    left: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    zIndex: 10
  };

  const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: getDamageColor(damage.damageType),
    display: 'inline-block'
  };

  return (
    <div style={boxStyle}>
      <div style={labelStyle}>
        <span style={dotStyle}></span>
        {getDamageLabel(damage.damageType)}
      </div>
    </div>
  );
}