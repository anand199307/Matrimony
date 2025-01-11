import * as Info from './Member.styles';
import { PrinterOutlined } from '@ant-design/icons';
import Memberinfocard from './Memberinfocard';
import { CaretDownFilled } from '@ant-design/icons';
import { Popover } from 'antd';
import { ReactComponent as DeleteIcon } from '@app/assets/icons/Bin.svg';
import { ReactComponent as EditIcon } from '@app/assets/icons/Edit_Box.svg';
import { ReactComponent as BlockIcon } from '@app/assets/icons/lock.svg';
import { useNavigate } from 'react-router-dom';
import { downloadProfile } from '@app/store/slices/addMember';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { updateUser } from '@app/store/slices/memberInfoSlice';

const MemberInformation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const memberInfo = useAppSelector((state) => state.member.info);
  const info = memberInfo?.userProfile;

  const downloadPdf = () => {
    if (info) {
      dispatch(downloadProfile(info?.uuid));
    }
  };

  const handleActions = (name: string) => {
    if (name === 'Delete Profile') {
      dispatch(updateUser({ uuid: info?.uuid, status: 0 }));
      navigate('/add-member');
    } else if (name === 'Block Prpfile') {
      dispatch(updateUser({ uuid: info?.uuid, status: -1 }));
      navigate('/add-member');
    } else {
      navigate('/add-member');
    }
  };
  const PopContent = (
    <div>
      {PopValues?.map((data) => {
        return (
          <Info.StyledPop key={data?.id}>
            <div onClick={() => handleActions(data?.name)}>
              <div className="iconDisplay">{data?.icon}</div>
              {data?.name}
            </div>
          </Info.StyledPop>
        );
      })}
    </div>
  );
  return (
    <Info.StyledDIv>
      <div className="wrapper">
        {/* <div className="content">Lorem ipsum dolor sit amet consectetur.</div> */}
        <div className="print">
          <div onClick={downloadPdf}>
            <PrinterOutlined style={{ color: '#ed1f50', padding: '5px' }} />
            Print
          </div>

          <Popover placement="bottom" content={PopContent} trigger="click">
            <Info.ActionButton>
              Actions <CaretDownFilled style={{ color: '#ffff' }} />
            </Info.ActionButton>
          </Popover>
        </div>
      </div>
      <Memberinfocard />
    </Info.StyledDIv>
  );
};

const PopValues = [
  {
    id: 1,
    name: 'Edit Profile',
    icon: <EditIcon />,
    nav: '/add-member',
  },
  {
    id: 2,
    name: 'Block Profile',
    icon: <BlockIcon />,
  },
  {
    id: 3,
    name: 'Delete Profile',
    icon: <DeleteIcon />,
  },
];
export default MemberInformation;
