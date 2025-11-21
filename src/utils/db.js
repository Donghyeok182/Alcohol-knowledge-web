import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

// 데이터베이스 읽기
export function readDB() {
  try {
    if (!fs.existsSync(dbPath)) {
      // 기본 데이터베이스 생성
      const defaultData = {
        users: [],
        products: []
      };
      fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('데이터베이스 읽기 오류:', error);
    return { users: [], products: [] };
  }
}

// 데이터베이스 쓰기
export function writeDB(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('데이터베이스 쓰기 오류:', error);
    return false;
  }
}

// 사용자 관련
export function getUsers() {
  const db = readDB();
  return db.users || [];
}

export function getUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email === email);
}

export function getUserById(id) {
  const users = getUsers();
  return users.find(u => u.id === parseInt(id));
}

export function addUser(user) {
  const db = readDB();
  const newId = db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1;
  const newUser = {
    ...user,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  db.users.push(newUser);
  writeDB(db);
  return newUser;
}

export function updateUser(id, updates) {
  const db = readDB();
  const userIndex = db.users.findIndex(u => u.id === parseInt(id));
  if (userIndex === -1) return null;
  
  db.users[userIndex] = {
    ...db.users[userIndex],
    ...updates,
    updated_at: new Date().toISOString()
  };
  writeDB(db);
  return db.users[userIndex];
}

// 제품 관련
export function getProducts() {
  const db = readDB();
  return db.products || [];
}

export function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === parseInt(id));
}

export function addProduct(product) {
  const db = readDB();
  const newId = db.products.length > 0 ? Math.max(...db.products.map(p => p.id)) + 1 : 1;
  const newProduct = {
    ...product,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  db.products.push(newProduct);
  writeDB(db);
  return newProduct;
}

export function updateProduct(id, updates) {
  const db = readDB();
  const productIndex = db.products.findIndex(p => p.id === parseInt(id));
  if (productIndex === -1) return null;
  
  db.products[productIndex] = {
    ...db.products[productIndex],
    ...updates,
    updated_at: new Date().toISOString()
  };
  writeDB(db);
  return db.products[productIndex];
}

export function deleteProduct(id) {
  const db = readDB();
  const productIndex = db.products.findIndex(p => p.id === parseInt(id));
  if (productIndex === -1) return false;
  
  db.products.splice(productIndex, 1);
  writeDB(db);
  return true;
}

