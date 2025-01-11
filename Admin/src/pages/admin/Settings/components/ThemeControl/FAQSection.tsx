import React, { useEffect, useState } from 'react';
import { FaqCard, ImgSize, DeviceText, SuccessCard, DesCard, UpdateBox, IconDelete } from '../SettingStyled';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { FaqInfo } from '@app/store/slices/settingSlice';
import { Divider } from 'antd';
import Accordion from './Accordian';

type Todo = {
  id: number;
  todo: string;
};
const FAQSection: React.FC = () => {
  const [list, setList] = useState<Todo[]>([
    {
      id: Math.random(),
      todo: '',
    },
  ]);

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [questionDebounce, setQuestionDebounce] = useState<string>('');
  const [answerDebounce, setAnswerDebounce] = useState<string>('');
  const [previewList, setPreviewList] = useState<any>();

  const faqQuery = useAppSelector((state) => state.data.info.listFaq);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setPreviewList(faqQuery ?? []);
  }, [faqQuery]);

  const handleDeleteItem = (id: any) => {
    const updatedList = previewList?.map((data: any) => ({
      ...data,
      faq: data?.faq?.filter((item: any) => item?.id !== id),
    }));
    const newData = [
      {
        ...previewList[0],
        faq: updatedList[0]?.faq,
        stories: [],
      },
    ];
    setPreviewList(newData);
    const values = {
      action: 'delete',
      objectType: 'faq',
      itemId: id,
    };
    dispatch(FaqInfo({ FaqPayload: values, uuid: faqQuery[0]?._id }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionDebounce(question);
      setAnswerDebounce(answer);
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [question, answer]);

  const handleAnswer = (event: any) => {
    const newValue = event.target.value;
    setAnswer(newValue);
  };

  const handleItemDelete = (id: number) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <FaqCard id="faqsection">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1>FAQ</h1>
          <ImgSize>Your queries will be displayed on bottom of FAQ section .</ImgSize>
        </div>
        {/* <div>
          <PlusBox onClick={() => AddTodo(input)}>
            <PlusOutlined />
          </PlusBox>
        </div> */}
      </div>

      <SuccessCard>
        {list?.map((data, ind) => (
          <div key={data?.id}>
            {/* <IconDelete
              onClick={() => handleItemDelete(data?.id)}
              style={{ position: 'absolute', right: '2%', top: '100px' }}
            /> */}
            <DeviceText>FAQ </DeviceText>
            <DesCard
              placeholder={`Question ${ind + 1}`}
              value={question}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
            />
            <DesCard value={answer} placeholder="Description" onChange={handleAnswer} />
          </div>
        ))}
      </SuccessCard>
      <Divider />

      <h1>Preview</h1>
      <div>
        {previewList?.map((faqGroup: any) =>
          faqGroup?.faq?.map((items: any, ind: any) => {
            return (
              <>
                <div key={items.id} style={{ position: 'relative' }}>
                  <IconDelete
                    onClick={() => handleDeleteItem(items?.id)}
                    style={{ width: '100%', position: 'absolute', left: '72%', top: '30px' }}
                  />
                  <DeviceText>FAQ </DeviceText>
                  <div>
                    <Accordion items={items} />
                  </div>
                  {/* <DesCard placeholder="question" value={items.question} />
                  <DesCard placeholder="Description" value={items.answer} /> */}
                </div>
              </>
            );
          }),
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <UpdateBox
          onClick={() => {
            const values = {
              action: 'add',
              objectType: 'faq',
              item: {
                id: `${Math.floor(10000 + Math.random() * 90000)}`,
                question: questionDebounce,
                answer: answerDebounce,
              },
            };
            dispatch(FaqInfo({ FaqPayload: values, uuid: faqQuery[0]?._id }));
            setQuestionDebounce('');
            setAnswerDebounce('');
            setQuestion('');
            setAnswer('');
          }}
          disabled={questionDebounce ? false : true}
        >
          Update
        </UpdateBox>
      </div>
    </FaqCard>
  );
};

export default FAQSection;
