"use client";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState(""); // حفظ قيمة الإدخال

  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  // فتح نافذة التعديل
  const handleEdit = (index: number) => {
    setCurrentItem(index);
    setEditText(items[index]);
    setIsEditing(true);
  };

  // حفظ التعديلات
  const handleSave = () => {
    // منع الحفظ إذا كان النص فارغًا بعد إزالة المسافات
    if (!editText.trim()) {
      alert("لا يمكن حفظ نص فارغ!"); // رسالة تحذيرية اختيارية
      return;
    }

    const updatedItems = [...items];

    // تحديث العنصر فقط إذا كان هناك تغيير
    if (currentItem !== null && updatedItems[currentItem] !== editText) {
      updatedItems[currentItem] = editText;
      setItems(updatedItems);
    }

    // إعادة تعيين القيم بعد الحفظ
    setIsEditing(false);
    setCurrentItem(null);
    setEditText(""); // مسح النص بعد الحفظ
  };



  const handleAdd = () => {
    if (input.trim()) { // منع إضافة عناصر فارغة
      setItems([...items, input]);
      setInput(""); // إعادة تعيين الحقل بعد الإضافة
    }
  };

  const handleDel = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

// =========================================================================================================
  return (
    <main className={styles.container}>
  {/* ========================================================================================================= */}
      <h1 >To Do List</h1>
{/* ========================================================================================================= */}
   <div className={styles.inputContainer}>
      <input className={styles.input}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="أضف مهمة جديدة"
      />
      <button className={styles.addButton} onClick={handleAdd}>إضافة</button> {/**1111111111111 */}
      </div>
{/* ========================================================================================================= */}
      
<div className={styles.itemContainer}>
  {items.map((item, index) => (
    <li className={styles.item} key={index}>
      {item}
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleDel(index)}>del</button>
        <button className={styles.update} onClick={() => handleEdit(index)}>update</button>
      </div>
    </li>
  ))}
</div>

{/* ========================================================================================================= */}
   
      {isEditing && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {/* ========================================================================================================= */}
            <h3>تعديل المهمة</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className={styles.buttonContainer}>
              <button className={styles.saveButton} onClick={handleSave}>حفظ</button>
              <button className={styles.closeButton} onClick={() => setIsEditing(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
{/* ========================================================================================================= */}

    </main>
  );
  
}
