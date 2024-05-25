import { useEffect, useState, useMemo, useCallback } from "react";
import styles from "./App.module.scss";
import Card from "./Components/Card/Card";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    let ignore = false;

    const request = async () => {
      try {
        setLoading(true);
        const result = await fetch("https://logiclike.com/docs/courses.json");
        const data = await result.json();

        if (!ignore) {
          setData(data);
        }
      } catch (error) {
        if (!ignore) {
          setError(
            "Прости, нам не удалось подгрузить информацию о курсах. Попробуй позже!"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    request();

    return () => {
      ignore = true;
    };
  }, []);

  const categories = useMemo(() => {
    if (data && !error) {
      const categoriesSet = new Set();

      data.forEach((element) => {
        element.tags.forEach((tag) => categoriesSet.add(tag));
      });

      return [...categoriesSet];
    } else {
      return null;
    }
  }, [data, error]);

  const handleChangeCategory = useCallback((newCategory) => {
    setSelectedCategory(newCategory);
  }, []);

  const filteredData = useMemo(() => {
    if (selectedCategory) {
      return data.filter(
        (element) => element.tags.indexOf(selectedCategory) !== -1
      );
    } else {
      return data;
    }
  }, [data, selectedCategory]);

  if (loading) {
    return <div className={styles.loading}>Загружаю...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!data) {
    return <div>Пока что у нас ничего нет! Зайди к нам попозже!</div>;
  }

  return (
    <div className={styles.app_container}>
      <div className={styles.sidebar}>
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onChangeCategory={handleChangeCategory}
        />
      </div>
      <div className={styles.cards_container}>
        {filteredData.map((element) => {
          return (
            <Card
              name={element.name}
              key={element.id}
              image={element.image}
              bgColor={element.bgColor}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
