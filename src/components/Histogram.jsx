import PropTypes from 'prop-types';

export default function Histogram({ data, color_map }) {
  const maxCount = Math.max(...Object.values(data));
  const maxHeight = 40;
  const scale = maxHeight / maxCount;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', fontSize: '12px' }}>
      {Object.entries(data).map(([grade, count]) => (
        <div key={grade} style={{ margin: '0 5px', textAlign: 'center' }}>
          <div style={{ marginBottom: '2px' }}>
            {count > 0 ? count : ''}
          </div>
          <div
            style={{
              backgroundColor: color_map[grade] || '#4285F4',
              height: `${Math.max(count * scale, 0)}px`,
              width: '15px'
            }}
          />
          <div>{grade}</div>
        </div>
      ))}
    </div>
  );
}

Histogram.propTypes = {
  data: PropTypes.objectOf(PropTypes.number).isRequired,
  color_map: PropTypes.objectOf(PropTypes.string)
};
