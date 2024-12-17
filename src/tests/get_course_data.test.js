import createFetchMock from 'vitest-fetch-mock';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import get_course_data from '../get_course_data';

const fetchMocker = createFetchMock(vi);


const test_course_data = {
  success: true,
  course: {
    name: 'Calculus',
    lecturer: 'Dr. John Doe',
  },
  grade: {
    semester: 1122,
    grades_str: '{"A+": 7, "A": 8, "A-": 7, "B+": 10, "B": 14, "B-": 4, "C+": 3, "C": 6, "C-": 3, "D": 4 , "E": 4, "X": 0 }',
    grades: { 'A+': 7, A: 8, 'A-': 7, 'B+': 10, B: 14, 'B-': 4, 'C+': 3, C: 6, 'C-': 3, D: 4, E: 4, X: 0 },
    total: 70,
    GPA: '2.88000000000000',
  },
};

describe('get_course_data on mocking data', () => {
  fetchMocker.enableMocks();
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  it('should return data when given valid token, courseName and lecturer', async () => {
    fetchMocker.mockResponseOnce(JSON.stringify(test_course_data), { status: 200 });
    const token = 'valid-token';
    const courseName = 'Calculus';
    const lecturer = 'Dr. John Doe';
  
    const result = await get_course_data(token, courseName, lecturer);
    expect(result).toEqual(test_course_data);
  });

  it('should return null when given invalid courseName and lecturer', async () => {
    fetchMocker.mockResponseOnce("", { status: 404 });
    const token = 'valid-token';
    const courseName = 'Calculus';
    const lecturer = 'Dr. Jane Doe';

    const result = await get_course_data(token, courseName, lecturer);
    expect(result).toBeNull();
  });

  it('should throw an error when given invalid token', async () => {
    fetchMocker.mockResponseOnce("", { status: 401 });
    const token = 'invalid-token';
    const courseName = 'Calculus';
    const lecturer = 'Dr. John Doe';

    await expect(get_course_data(token, courseName, lecturer)).rejects.toThrow('Invalid token');
  });
});

describe('get_course_data on real data', () => {
  fetchMocker.disableMocks();

  const token = "vInjOADdOVN6xBO5GuZE1pxNNBwNe2zt";

  it('should return data when given valid token, courseName and lecturer', async () => {
    const courseName = '微積分(下)';
    const lecturer = '沈哲州';
    const result = await get_course_data(token, courseName, lecturer);
    expect(result).not.toBeNull();
  });

  it('should return null when given invalid courseName and lecturer', async () => {
    const courseName = '微積分(下)';
    const lecturer = '沈哲洲';
    const result = await get_course_data(token, courseName, lecturer);
    expect(result).toBeNull();
  });

  it('should throw an error when given invalid token', async () => {
    const token = 'invalid-token';
    const courseName = '微積分(下)';
    const lecturer = '沈哲州';
    await expect(get_course_data(token, courseName, lecturer)).rejects.toThrow('Invalid token');
  });
});