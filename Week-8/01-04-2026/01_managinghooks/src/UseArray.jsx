import React, { useState } from "react";

function UseArray() {
  const [items, setItems] = useState([]);

  // 1. Adds single item
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "Item " + (items.length + 1), // FIX: Changed comma to dot
      created: new Date().toLocaleTimeString(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  // 2. Add multiple items
  const addMultipleItems = () => {
    const newItems = [
      { id: Date.now(), name: "Batch Item 1", created: new Date().toLocaleTimeString() },
      { id: Date.now() + 1, name: "Batch Item 2", created: new Date().toLocaleTimeString() },
      { id: Date.now() + 2, name: "Batch Item 3", created: new Date().toLocaleTimeString() },
    ];
    setItems((prev) => [...prev, ...newItems]);
  };

  // 3. Update item
  const updateItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, name: "Updated Item", updated: new Date().toLocaleTimeString() }
          : item
      )
    );
  };

  // 4. Delete item
  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 5. Delete All
  const deleteAllItems = () => {
    setItems([]);
  };

  // FIX: Added the missing styles object
  const styles = {
    item: {
      border: "1px solid #ccc",
      padding: "10px",
      margin: "10px 0",
      listStyle: "none",
      borderRadius: "5px"
    },
    smallBtn: {
      marginRight: "5px",
      marginTop: "10px",
      cursor: "pointer"
    },
    btn: {
      marginRight: "10px",
      padding: "8px 12px",
      cursor: "pointer"
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button style={styles.btn} onClick={addItem}> Add Item </button>
      <button style={styles.btn} onClick={addMultipleItems}> Add Multiple Items </button>
      <button style={styles.btn} onClick={deleteAllItems}> Delete All Items </button>
      
      <h3> Total Items: {items.length} </h3>
      
      {/* List Rendering */}
      <ul style={{ padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={styles.item}>
            <strong>{item.name}</strong> <br />
            Created: {item.created} <br />
            {item.updated && (
              <>
                Updated: {item.updated} <br />
              </>
            )}

            <button style={styles.smallBtn} onClick={() => updateItem(item.id)}>
              Update
            </button>

            <button style={styles.smallBtn} onClick={() => deleteItem(item.id)}>
              Delete
            </button>
            
            {/* FIX: Removed the redundant Delete All button from here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UseArray;