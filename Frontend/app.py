import streamlit as st
import requests
import pandas as pd

BASE_URL = "https://solid-giggle-v6jjx99wgwr5fw546-3000.app.github.dev"

st.set_page_config(page_title="E-commerce Dashboard", layout="wide")
st.title("🛒 E-commerce Dashboard")

table = st.sidebar.selectbox("Select Table", ["Users", "Products", "Categories", "Orders", "Payments", "Reviews"])

def fetch(endpoint):
    try:
        res = requests.get(f"{BASE_URL}/{endpoint}")
        return pd.DataFrame(res.json())
    except:
        return pd.DataFrame()

if table == "Users":
    action = st.sidebar.selectbox("Select Action", ["View", "Create", "Update", "Delete"])

    if action == "View":
        df = fetch("users")
        user_id_filter = st.number_input("Filter by User ID", min_value=0, step=1)
        if user_id_filter > 0:
            df = df[df["user_id"] == user_id_filter]
        st.dataframe(df)

    elif action == "Create":
        name = st.text_input("Name")
        email = st.text_input("Email")
        password = st.text_input("Password")
        if st.button("Create"):
            requests.post(f"{BASE_URL}/users", json={"name": name, "email": email, "password": password})
            st.success("User created")

    elif action == "Update":
        user_id = st.number_input("User ID", min_value=1)
        name = st.text_input("New Name")
        email = st.text_input("New Email")
        password = st.text_input("New Password")
        if st.button("Update"):
            requests.put(f"{BASE_URL}/users/{user_id}", json={"name": name, "email": email, "password": password})
            st.success("User updated")

    elif action == "Delete":
        user_id = st.number_input("User ID", min_value=1)
        if st.button("Delete"):
            requests.delete(f"{BASE_URL}/users/{user_id}")
            st.warning("User deleted")

elif table == "Products":
    action = st.sidebar.selectbox("Select Action", ["View", "Create", "Update", "Delete"])

    if action == "View":
        df = fetch("products")
        product_id = st.number_input("Filter by Product ID", min_value=0)
        if product_id > 0:
            df = df[df["product_id"] == product_id]

        price_range = st.slider("Price Range", 0, 200000, (0, 200000))
        df = df[(df["price"] >= price_range[0]) & (df["price"] <= price_range[1])]

        st.dataframe(df)

    elif action == "Create":
        name = st.text_input("Name")
        price = st.number_input("Price")
        category_id = st.number_input("Category ID")
        stock = st.number_input("Stock")
        if st.button("Create"):
            requests.post(f"{BASE_URL}/products", json={
                "name": name,
                "price": price,
                "category_id": category_id,
                "stock": stock
            })
            st.success("Product created")

    elif action == "Update":
        product_id = st.number_input("Product ID", min_value=1)
        name = st.text_input("Name")
        price = st.number_input("Price")
        category_id = st.number_input("Category ID")
        stock = st.number_input("Stock")
        if st.button("Update"):
            requests.put(f"{BASE_URL}/products/{product_id}", json={
                "name": name,
                "price": price,
                "category_id": category_id,
                "stock": stock
            })
            st.success("Product updated")

    elif action == "Delete":
        product_id = st.number_input("Product ID", min_value=1)
        if st.button("Delete"):
            requests.delete(f"{BASE_URL}/products/{product_id}")
            st.warning("Product deleted")

elif table == "Categories":
    action = st.sidebar.selectbox("Select Action", ["View", "Create", "Update", "Delete"])

    if action == "View":
        df = fetch("categories")
        st.dataframe(df)

    elif action == "Create":
        name = st.text_input("Category Name")
        if st.button("Create"):
            requests.post(f"{BASE_URL}/categories", json={"name": name})
            st.success("Category created")

    elif action == "Update":
        category_id = st.number_input("Category ID", min_value=1)
        name = st.text_input("New Name")
        if st.button("Update"):
            requests.put(f"{BASE_URL}/categories/{category_id}", json={"name": name})
            st.success("Category updated")

    elif action == "Delete":
        category_id = st.number_input("Category ID", min_value=1)
        if st.button("Delete"):
            requests.delete(f"{BASE_URL}/categories/{category_id}")
            st.warning("Category deleted")

elif table == "Orders":
    action = st.sidebar.selectbox("Select Action", ["View", "Create", "Update", "Delete"])

    if action == "View":
        df = fetch("orders")
        status = st.selectbox("Filter by Status", ["All", "Completed", "Pending", "Cancelled"])
        if status != "All":
            df = df[df["status"] == status]
        st.dataframe(df)

    elif action == "Create":
        user_id = st.number_input("User ID")
        status = st.selectbox("Status", ["Pending", "Completed", "Cancelled"])
        if st.button("Create"):
            requests.post(f"{BASE_URL}/orders", json={"user_id": user_id, "status": status})
            st.success("Order created")

    elif action == "Update":
        order_id = st.number_input("Order ID", min_value=1)
        status = st.selectbox("New Status", ["Pending", "Completed", "Cancelled"])
        if st.button("Update"):
            requests.put(f"{BASE_URL}/orders/{order_id}", json={"status": status})
            st.success("Order updated")

    elif action == "Delete":
        order_id = st.number_input("Order ID", min_value=1)
        if st.button("Delete"):
            requests.delete(f"{BASE_URL}/orders/{order_id}")
            st.warning("Order deleted")


elif table == "Payments":
    df = fetch("payments")
    st.dataframe(df)
    if not df.empty:
        st.metric("Total Sales", f"Rs {df['amount'].sum()}")


elif table == "Reviews":
    df = fetch("reviews")
    st.dataframe(df)