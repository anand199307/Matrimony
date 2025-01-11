import React, { useEffect, useState } from 'react';
import {
  StoriesSuccess,
  ImgSize,
  CardUploader,
  UploadImg,
  DeviceText,
  SuccessCard,
  UpdateBox,
  IconDelete,
  PreviewCard,
} from '../SettingStyled';
import { Divider } from 'antd';
import UploaderImage from './UploaderImage';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { uploadedStory } from '@app/store/slices/settingSlice';
import { getImage } from '@app/store/slices/addMember';
import { FaqInfo } from '@app/store/slices/settingSlice';
import { Profile } from '@app/components/common/forms/FormStyled';

export interface Todo {
  id: number;
  todo: string;
  url?: string;
}

const SuccessStories: React.FC = () => {
  const dispatch = useAppDispatch();

  const [list, setList] = useState<Todo[]>([
    {
      id: Math.random(),
      todo: '',
    },
  ]);
  const [profileList, setProfileList] = useState();
  const [storyUrl, setStoryUrl] = useState<any>(null);
  const [storyPreviewList, setStoryPreviewList] = useState<any>();
  const storiessuccess = useAppSelector((state) => state.data.info.Successlist);
  const faqQuery = useAppSelector((state) => state.data.info.listFaq);

  useEffect(() => {
    setStoryPreviewList(faqQuery ?? []);
  }, [faqQuery]);

  const handleDeleteItem = (id: any) => {
    const updatedList = storyPreviewList?.map((data: any) => ({
      ...data,
      stories: data?.stories?.filter((item: any) => item?.id !== id),
    }));
    const newData = [
      {
        ...storyPreviewList[0],
        faq: [],
        stories: updatedList[0]?.stories,
      },
    ];

    setStoryPreviewList(newData);
    const values = {
      action: 'delete',
      objectType: 'stories',
      itemId: id,
    };
    dispatch(FaqInfo({ FaqPayload: values, uuid: faqQuery[0]?._id }));
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(uploadedStory());
      setProfileList(file);
    }
  };

  useEffect(() => {
    if (storiessuccess?.url && profileList) {
      const file: File = profileList;
      dispatch(getImage(storiessuccess as any, file));
      setStoryUrl(storiessuccess?.url?.split('?').shift());
    }
  }, [dispatch, storiessuccess, profileList]);
  useEffect(() => {
    setList((prevList: any[]) => {
      return prevList.map((data) => ({
        ...data,
        url: storyUrl,
      }));
    });
  }, [storyUrl]);

  return (
    <StoriesSuccess id="successstories">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1>Success Stories</h1>
          <ImgSize>images displayed on top of your Stories section.</ImgSize>
        </div>
        {/* <div>
          <PlusBox
            //disabled={storyPreviewList?.length >= 1 || storyUrl?.length === 0 ? false : true}
            onClick={() => AddTodo(input)}
          >
            <PlusOutlined />
          </PlusBox>
        </div> */}
      </div>
      <SuccessCard>
        {list?.map((datas, ind) => {
          return (
            <div key={datas?.id}>
              {/* <IconDelete onClick={() => handleDeleteItem(datas?.id)} style={{ position: 'absolute', right: '10px' }} /> */}
              <DeviceText>{`Story ${ind + 1}`}</DeviceText>
              <CardUploader>
                {datas?.todo}

                <UploaderImage handleFileChange={handleFileChange} storyUrl={datas?.url} setStoryUrl={setStoryUrl} />

                {/* <StoryCard placeholder="Image text" onChange={(e) => setInput(e.target.value)} /> */}
              </CardUploader>
            </div>
          );
        })}
      </SuccessCard>
      <Divider />
      <h1>Preview</h1>
      <PreviewCard>
        {storyPreviewList?.map((faqGroup: any) =>
          faqGroup?.stories?.map((items: any, ind: any) => {
            return (
              <>
                <div key={items.id} style={{ position: 'relative' }}>
                  <IconDelete
                    onClick={() => handleDeleteItem(items?.id)}
                    style={{
                      position: 'absolute',
                      left: '75%',
                      bottom: '70px',
                      width: '100%',
                    }}
                  />
                  <DeviceText>{`Story ${ind + 1}`}</DeviceText>
                  <Profile>
                    <UploadImg
                      src={items?.storyImage}
                      alt="UploadedImg"
                      onChange={(e: any) => setStoryUrl(e.target.value)}
                    />
                  </Profile>
                </div>
              </>
            );
          }),
        )}
      </PreviewCard>

      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <UpdateBox
          onClick={() => {
            const values = {
              action: 'add',
              objectType: 'stories',
              item: {
                id: `${Math.floor(10000 + Math.random() * 90000)}`,
                storyImage: storyUrl,
              },
            };
            dispatch(FaqInfo({ FaqPayload: values, uuid: faqQuery[0]?._id }));
            setStoryUrl(null);
          }}
          disabled={storyUrl ? false : true}
        >
          Update
        </UpdateBox>
      </div>
    </StoriesSuccess>
  );
};

export default SuccessStories;
