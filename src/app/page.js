'use client'
import { useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Landing from '../components/Landing'
import Filter from '../components/Filter'
import Products from '../components/Products'



export default function Home() {
  const [activeCategoryId, setActiveCategoryId] = useState('all')
  return (
    <div className={styles.page}>
        <Landing/>
        <Filter onFilterChange={setActiveCategoryId} />
        <Products activeCategoryId={activeCategoryId} />
      
    </div>
  );
}
