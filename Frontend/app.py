import streamlit as st
import requests
import pandas as pd

# Your backend URL
BASE_URL = "http://127.0.0.1:3000"

st.set_page_config(page_title="E-commerce Dashboard", layout="wide")

st.title("🛒 E-commerce Dashboard")

# =====================
# SIDEBAR
# =====================
option = st.sidebar.selectbox(
    "Select Data",
    ["Users", "Products", "Orders", "Payments", "Reviews", "Categories"]
)

# =====================
# FETCH FUNCTION
# =====================
def fetch_data(endpoint):
    try:
        response = requests.get(f"{BASE_URL}/{endpoint}")
        return pd.DataFrame(response.json())
    except:
        st.error("Failed to fetch data")
        return pd.DataFrame()

# =====================
# USERS
# =====================
if option == "Users":
    st.subheader("👤 Users")
    df = fetch_data("users")
    st.dataframe(df)

# =====================
# PRODUCTS
# =====================
elif option == "Products":
    st.subheader("📦 Products")
    df = fetch_data("products")
    st.dataframe(df)

    # Chart
    st.subheader("Stock Distribution")
    if not df.empty:
        st.bar_chart(df.set_index("name")["stock"])

# =====================
# ORDERS
# =====================
elif option == "Orders":
    st.subheader("📑 Orders")
    df = fetch_data("orders")
    st.dataframe(df)

# =====================
# PAYMENTS
# =====================
elif option == "Payments":
    st.subheader("💳 Payments")
    df = fetch_data("payments")
    st.dataframe(df)

    if not df.empty:
        total = df["amount"].sum()
        st.metric("💰 Total Sales", f"Rs {total}")

# =====================
# REVIEWS
# =====================
elif option == "Reviews":
    st.subheader("⭐ Reviews")
    df = fetch_data("reviews")
    st.dataframe(df)

# =====================
# CATEGORIES
# =====================
elif option == "Categories":
    st.subheader("📂 Categories")
    df = fetch_data("categories")
    st.dataframe(df)