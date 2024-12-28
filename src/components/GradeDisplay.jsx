import Histogram from "./Histogram";
import PropTypes from 'prop-types';

const color_map = {
  'A+': '#10B981',
  'A': '#10B981',
  'A-': '#10B981',
  'B+': '#FACC15',
  'B': '#FACC15',
  'B-': '#FACC15',
  'C+': '#F97316',
  'C': '#F97316',
  'C-': '#F97316',
  'D': '#EF4444',
  'E': '#EF4444',
  'X': '#EF4444',
};

export default function GradeDisplay({ grade_data }) {
  return (
    <div style={{ 
      background: '#f5f5f5', 
      padding: '20px', 
      borderRadius: '20px', 
      color: 'black', 
      fontWeight: 'normal',
      border: '1px solid #ddd',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Added shadow
    }}>
      <Histogram data={grade_data.grades} color_map={color_map} />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px'}}>
        <label>
          GPA: {parseFloat(grade_data.GPA).toFixed(2)}
        </label>
        <label>
          Total: {grade_data.total}
        </label>
        <label>
          Semester: {grade_data.semester}
        </label>
      </div>
    </div>
  );
}

GradeDisplay.propTypes = {
  grade_data: PropTypes.shape({
    grades: PropTypes.object.isRequired,
    GPA: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    semester: PropTypes.string.isRequired
  }).isRequired
};