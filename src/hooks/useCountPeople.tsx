import React, { useEffect, useState } from "react";

export const useCountPeople = (): number | null => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      fetch("https://swapi.py4e.com/api/people/")
        .then((response) => response.json())
        .then((res) => {
            setCount(res.count);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return count;
};
