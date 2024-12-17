

const url = 'https://gpa.myntust.com/api/v1/GradeData'

export default async function get_course_data(token, courseName, lecturer) {
    const body = {
        "CourseName": courseName,
        "Lecturer": lecturer
    }
    const result = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    )
    if (result.status === 401) {
        throw new Error('Invalid token')
    }
    
    if (result.status === 404) {
        return null
    }

    if (result.ok){
        const data = await result.json()
        return data
    }

    throw new Error('Failed to get data')
}