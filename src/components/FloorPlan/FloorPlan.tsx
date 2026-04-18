import type { DangerZone } from '../../types';
import { ROOMS } from '../../constants';

interface FloorPlanProps {
  dangerZones: DangerZone[];
  highlightRoom?: number;
  showPath?: boolean;
  onRoomClick?: (roomId: string) => void;
  sosRooms?: number[];
  readOnly?: boolean;
}

function getRoomFill(
  roomId: string,
  highlightRoom: number | undefined,
  dangerZones: DangerZone[]
): string {
  const room = ROOMS.find((r) => r.id === roomId);
  if (!room) return '#112240';

  if (highlightRoom && room.label === String(highlightRoom)) return '#D4AF37';

  const dz = dangerZones.find((z) => z.roomId === roomId);
  if (dz?.level === 'danger') return 'rgba(231,76,60,0.7)';
  if (dz?.level === 'warning') return 'rgba(243,156,18,0.6)';

  return '#112240';
}

export default function FloorPlan({
  dangerZones,
  highlightRoom,
  showPath = false,
  onRoomClick,
  sosRooms = [],
  readOnly = false,
}: FloorPlanProps) {
  // Build escape path points if showPath is true
  const highlightedRoom = highlightRoom
    ? ROOMS.find((r) => r.label === String(highlightRoom))
    : null;

  const pathPoints = highlightedRoom
    ? `${highlightedRoom.x + highlightedRoom.width / 2},${
        highlightedRoom.y + highlightedRoom.height / 2
      } 200,180 370,180`
    : '';

  return (
    <svg
      viewBox="0 0 420 360"
      className="w-full rounded-xl"
      style={{ background: '#0A1628' }}
    >
      {/* Background */}
      <rect x="0" y="0" width="420" height="360" fill="#0A1628" rx="12" />

      {/* Floor label */}
      <text x="210" y="30" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="12" fontFamily="Inter, sans-serif">
        Floor 1 — Emergency Plan
      </text>

      {/* Corridor guidelines */}
      <rect x="130" y="75" width="150" height="250" fill="#0d1e38" rx="4" opacity="0.5" />

      {/* Stairwell */}
      <rect x="160" y="100" width="80" height="160" fill="#1a2a4a" rx="6" />
      <text x="200" y="176" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600">
        Stair
      </text>
      <text x="200" y="192" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600">
        well
      </text>

      {/* EXIT */}
      <rect x="340" y="155" width="64" height="44" fill="rgba(46,204,113,0.2)" stroke="#2ECC71" strokeWidth="2" rx="6" />
      <text x="372" y="179" textAnchor="middle" fill="#2ECC71" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700">
        EXIT
      </text>

      {/* Rooms */}
      {ROOMS.map((room) => {
        const fill = getRoomFill(room.id, highlightRoom, dangerZones);
        const isClickable = !readOnly && onRoomClick;
        const dz = dangerZones.find((z) => z.roomId === room.id);
        const strokeColor = dz?.level === 'danger'
          ? '#E74C3C'
          : dz?.level === 'warning'
          ? '#F39C12'
          : 'rgba(212,175,55,0.4)';

        return (
          <g
            key={room.id}
            onClick={() => isClickable && onRoomClick(room.id)}
            style={{ cursor: isClickable ? 'pointer' : 'default' }}
          >
            <rect
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.height}
              fill={fill}
              stroke={strokeColor}
              strokeWidth="1.5"
              rx="6"
            />
            <text
              x={room.x + room.width / 2}
              y={room.y + room.height / 2 + 5}
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
            >
              {room.label}
            </text>
          </g>
        );
      })}

      {/* Escape path */}
      {showPath && pathPoints && (
        <polyline
          points={pathPoints}
          fill="none"
          stroke="#2ECC71"
          strokeWidth="2.5"
          strokeDasharray="8 4"
          opacity="0.9"
        />
      )}

      {/* SOS pulse circles */}
      {sosRooms.map((roomNum) => {
        const room = ROOMS.find((r) => r.label === String(roomNum));
        if (!room) return null;
        const cx = room.x + room.width / 2;
        const cy = room.y + room.height / 2;
        return (
          <g key={`sos-${roomNum}`}>
            <circle cx={cx} cy={cy} fill="rgba(243,156,18,0.9)" r="5">
              <animate
                attributeName="r"
                values="5;14;5"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.9;0.2;0.9"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}
