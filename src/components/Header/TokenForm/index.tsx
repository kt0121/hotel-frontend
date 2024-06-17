import { Button, Input, Space } from "antd";

type Props = {
  token: string | null;
  isTokenValid: boolean;
  defaultToken: string;
  onInputChange: (e: any) => void;
  onAccessClick: () => void;
};

const TokenForm: React.FC<Props> = ({
  token,
  isTokenValid,
  defaultToken,
  onInputChange,
  onAccessClick,
}) => {
  return (
    <Space>
      <Input
        id="access_token"
        type="text"
        defaultValue={defaultToken}
        onChange={onInputChange}
        disabled={Boolean(token)}
      />

      <Button
        type="primary"
        htmlType="submit"
        id="token_check"
        onClick={onAccessClick}
        disabled={Boolean(token) || !isTokenValid}
      >
        Access
      </Button>
    </Space>
  );
};

export default TokenForm;
