const serverUrl = 'http://localhost:3000/data';

async function fetchData() {
  try {
    const response = await fetch(serverUrl, {
      method: 'GET',
      headers: {
        'x-api-key': '123456', // Thay bằng API key thực tế
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dữ liệu từ server:', data);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ server:', error.message);
  }
}

fetchData();