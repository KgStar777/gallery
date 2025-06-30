import fs from 'fs';
import path from 'path';

export function getKeywordsRu(): string[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'keywordsRu.txt');
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
  } catch (error) {
    console.error('Ошибка чтения русских ключевых слов:', error);
    return [];
  }
}

export function getKeywordsEn(): string[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'keywordsEn.txt');
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
  } catch (error) {
    console.error('Ошибка чтения английских ключевых слов:', error);
    return [];
  }
} 