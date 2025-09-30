import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useInterval } from '@/hooks';

interface CircleFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const FEATURES: CircleFeature[] = [
  {
    id: 1,
    title: 'Automate',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    icon: 'ion-ios-timer-outline',
  },
  {
    id: 2,
    title: 'Chat',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    icon: 'ion-ios-chatboxes-outline',
  },
  {
    id: 3,
    title: 'Responses',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    icon: 'ion-ios-person-outline',
  },
  {
    id: 4,
    title: 'Tags',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    icon: 'ion-ios-pricetags-outline',
  },
  {
    id: 5,
    title: 'Sharing',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    icon: 'ion-ios-upload-outline',
  },
  {
    id: 6,
    title: 'Support',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    icon: 'ion-ios-briefcase-outline',
  },
];

const ROTATION_INTERVAL = 5000;
const DOT_SIZE = 80; // width/height from CSS

export function CircleFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = FEATURES.length;
  const holderRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState(() =>
    Array.from({ length: totalItems }, () => ({ left: 0, top: 0 })),
  );

  const rotationStep = useMemo(() => 360 / totalItems, [totalItems]);

  const updatePositions = useCallback(() => {
    const holder = holderRef.current;
    if (!holder) {
      return;
    }

    const { offsetWidth: width, offsetHeight: height } = holder;
    if (!width || !height) {
      return;
    }

    const radius = width / 2.5;
    const step = (2 * Math.PI) / totalItems;

    const nextPositions = FEATURES.map((_, index) => {
      const angle = index * step;
      const x = width / 2 + radius * Math.cos(angle) - DOT_SIZE / 2;
      const y = height / 2 + radius * Math.sin(angle) - DOT_SIZE / 2;
      return { left: x, top: y };
    });

    setPositions(nextPositions);
  }, [totalItems]);

  useLayoutEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [updatePositions]);

  useInterval(() => {
    setActiveIndex((index) => (index + 1) % totalItems);
  }, ROTATION_INTERVAL);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const dotCircleStyle = useMemo(
    () => ({
      transform: `rotate(${360 - activeIndex * rotationStep}deg)`,
      transition: '2s',
    }),
    [activeIndex, rotationStep],
  );

  const itemRotation = useMemo(() => activeIndex * rotationStep, [activeIndex, rotationStep]);

  return (
    <div className="holderCircle" ref={holderRef}>
      <div className="round" />
      <div className="dotCircle" style={dotCircleStyle}>
        {FEATURES.map((feature, index) => (
          <span
            key={feature.id}
            className={`itemDot itemDot${feature.id}${index === activeIndex ? ' active' : ''}`}
            data-tab={feature.id}
            style={{
              left: positions[index]?.left ?? 0,
              top: positions[index]?.top ?? 0,
              transform: `rotate(${itemRotation}deg)`,
              transition: '1s',
            }}
            onClick={() => handleSelect(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleSelect(index);
              }
            }}
          >
            <i className={feature.icon} />
            <span className="forActive" />
          </span>
        ))}
      </div>
      <div className="contentCircle">
        {FEATURES.map((feature, index) => (
          <div
            key={feature.id}
            className={`CirItem title-box CirItem${feature.id}${index === activeIndex ? ' active' : ''}`}
          >
            <h2 className="title">
              <span>{feature.title}</span>
            </h2>
            <p>{feature.description}</p>
            <i className={feature.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}
