import React from 'react';
import { Navigate } from 'react-router-dom';
import { WithChildrenProps } from '@app/types/generalTypes';

const RequireAuth: React.FC<WithChildrenProps> = ({ children, authToken }) => {
  const token = authToken;
  return token ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default RequireAuth;
