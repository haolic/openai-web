import { Button, Input, InputRef, Spin } from 'antd';
import styles from './index.module.less';
import request from '@/utils/request';
import { useRef, useState } from 'react';

const ImageGen = () => {
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const ref = useRef<InputRef>(null);

  const handleClick = async () => {
    const value = ref.current?.input?.value;
    if (!value?.trim()) {
      setIsError(true);
      return;
    }
    setLoading(true);
    setImages([]);
    // 把value中的空格替换成逗号
    const message = value?.trim().replace(/\s+/g, ',');
    const res = await request({
      url: '/api/image',
      method: 'POST',
      data: {
        message: message,
      },
    });
    setImages(res?.data || []);
    setLoading(false);
  };

  return (
    <div className={styles.imageWrap}>
      <div className={styles.input}>
        <Input
          status={isError ? 'error' : undefined}
          ref={ref}
          style={{ width: 400 }}
          placeholder="请输入提示词"
          onInput={() => setIsError(false)}
        />
        <Button onClick={handleClick} loading={loading} style={{ width: 150 }}>
          点击生成图片
        </Button>
      </div>

      <div className={styles.imageList}>
        {loading ? (
          <Spin />
        ) : (
          images.map((item) => {
            return <img src={item.url} key={item.url} alt="图片" />;
          })
        )}
      </div>
    </div>
  );
};

ImageGen.title = 'GhatGPT';

export default ImageGen;
