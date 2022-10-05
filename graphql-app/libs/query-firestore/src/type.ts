import { firestore } from 'firebase-admin';
import DocumentData = firestore.DocumentData;

export interface EntityDTO extends DocumentData {
  id: string;
}
