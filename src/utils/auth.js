import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, getUserById, addUser, getUsers } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// 회원가입
export function registerUser(data) {
  try {
    // 이메일 중복 확인
    const existingUser = getUserByEmail(data.email);
    if (existingUser) {
      return { success: false, error: '이미 존재하는 이메일입니다.' };
    }

    // 비밀번호 해싱
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    // 사용자 생성
    const user = addUser({
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: 'user',
      preferences: data.preferences || null
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        preferences: user.preferences
      }
    };
  } catch (error) {
    return { success: false, error: error.message || '회원가입에 실패했습니다.' };
  }
}

// 로그인
export function loginUser(data) {
  try {
    const user = getUserByEmail(data.email);
    
    if (!user) {
      return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    }

    // 비밀번호 확인
    const isValid = bcrypt.compareSync(data.password, user.password);
    if (!isValid) {
      return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        preferences: user.preferences
      }
    };
  } catch (error) {
    return { success: false, error: error.message || '로그인에 실패했습니다.' };
  }
}

// 토큰 검증
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = getUserById(decoded.id);
    
    if (!user) {
      return { valid: false, error: '사용자를 찾을 수 없습니다.' };
    }

    return {
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        preferences: user.preferences
      }
    };
  } catch (error) {
    return { valid: false, error: '토큰이 유효하지 않습니다.' };
  }
}

// 사용자 정보 가져오기 (이름 충돌 방지)
export function getUserByIdAuth(id) {
  try {
    const user = getUserById(id);
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      preferences: user.preferences
    };
  } catch {
    return null;
  }
}

// 모든 사용자 가져오기 (관리자용)
export function getAllUsers() {
  try {
    const users = getUsers();
    return users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      preferences: user.preferences
    }));
  } catch {
    return [];
  }
}

