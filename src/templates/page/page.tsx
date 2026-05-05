"use client";

import styles from "./page.module.css";

export interface IBaseTemplatePage {
  sampleTextProp: string;
}

const BaseTemplatePage: React.FC<IBaseTemplatePage> = ({ sampleTextProp }) => {
  return <div className={styles.container}>{sampleTextProp}</div>;
};

export default BaseTemplatePage;
