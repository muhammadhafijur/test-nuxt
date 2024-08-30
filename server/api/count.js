import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/count.json'); // Ensure the path is correct

export default defineEventHandler(async (event) => {
  try {
    if (event.node.req.method === 'GET') {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ count: 0 }));
      }
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }

    if (event.node.req.method === 'POST') {
      const { count } = await readBody(event);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ count: 0 }));
      }
      const data = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(data);
      jsonData.count = count;
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
      return jsonData;
    }

    // Handle unsupported methods
    return { error: 'Method not allowed' };

  } catch (error) {
    console.error('Error:', error);
    return { error: 'Internal Server Error' };
  }
});
