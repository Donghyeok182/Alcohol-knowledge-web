import { getProducts, getProductById as getProductByIdDB, addProduct, updateProduct, deleteProduct as deleteProductDB } from './db.js';

// 모든 제품 가져오기
export function getAllProducts() {
  try {
    const products = getProducts();
    return products.sort((a, b) => {
      if (a.type !== b.type) return a.type.localeCompare(b.type);
      return a.name.localeCompare(b.name);
    });
  } catch {
    return [];
  }
}

// 타입별 제품 가져오기
export function getProductsByType(type) {
  try {
    const products = getProducts();
    return products.filter(p => p.type === type).sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

// 레벨별 제품 가져오기
export function getProductsByLevel(level) {
  try {
    const products = getProducts();
    return products.filter(p => p.level === level).sort((a, b) => {
      if (a.type !== b.type) return a.type.localeCompare(b.type);
      return a.name.localeCompare(b.name);
    });
  } catch {
    return [];
  }
}

// ID로 제품 가져오기
export function getProductById(id) {
  try {
    return getProductByIdDB(parseInt(id));
  } catch {
    return null;
  }
}

// 선호도 기반 추천
export function getRecommendedProducts(preferences) {
  try {
    const allProducts = getAllProducts();
    
    // 선호도가 없으면 레벨 기반으로 반환
    if (!preferences || (!preferences.taste?.length && !preferences.feeling?.length && !preferences.category?.length)) {
      return getProductsByLevel('beginner');
    }

    // 태그 기반 점수 계산
    const scoredProducts = allProducts.map(product => {
      let score = 0;
      const productTags = (product.tags || []).map(t => t.toLowerCase());

      // 맛 선호도 매칭
      if (preferences.taste) {
        preferences.taste.forEach(taste => {
          if (productTags.includes(taste.toLowerCase())) {
            score += 3;
          }
        });
      }

      // 느낌 선호도 매칭
      if (preferences.feeling) {
        preferences.feeling.forEach(feeling => {
          if (productTags.includes(feeling.toLowerCase())) {
            score += 2;
          }
        });
      }

      // 카테고리 선호도 매칭
      if (preferences.category) {
        preferences.category.forEach(category => {
          if (product.type === category.toLowerCase()) {
            score += 5;
          }
        });
      }

      return { product, score };
    });

    // 점수 순으로 정렬하고 상위 제품 반환
    return scoredProducts
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product)
      .slice(0, 12); // 상위 12개
  } catch {
    return getProductsByLevel('beginner');
  }
}

// 제품 생성 (관리자용)
export function createProduct(product) {
  try {
    const newProduct = addProduct(product);
    return { success: true, product: newProduct };
  } catch (error) {
    return { success: false, error: error.message || '제품 생성에 실패했습니다.' };
  }
}

// 제품 업데이트 (관리자용)
export function updateProductById(id, product) {
  try {
    const existing = getProductById(id);
    if (!existing) {
      return { success: false, error: '제품을 찾을 수 없습니다.' };
    }

    const updated = updateProduct(id, product);
    return { success: true, product: updated };
  } catch (error) {
    return { success: false, error: error.message || '제품 업데이트에 실패했습니다.' };
  }
}

// 제품 삭제 (관리자용)
export function deleteProduct(id) {
  try {
    const result = deleteProductDB(id);
    if (!result) {
      return { success: false, error: '제품을 찾을 수 없습니다.' };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || '제품 삭제에 실패했습니다.' };
  }
}

