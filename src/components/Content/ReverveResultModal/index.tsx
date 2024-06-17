import { Modal, Result, Spin } from "antd";
import { Style } from "types/style";

type Props = {
  isModalOpen: boolean;
  postReserveStatus: number | null;
  isPostReserveLoading: boolean;
  reservationId?: number;
  handleModalClose: () => void;
};
const ReserveResultModal: React.FC<Props> = ({
  isModalOpen,
  postReserveStatus,
  reservationId,
  isPostReserveLoading,
  handleModalClose,
}) => {
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onCancel={handleModalClose}
      bodyStyle={style.modal}
      footer={[]}
    >
      {isPostReserveLoading ? (
        <Spin tip="通信中です" size="large" style={style.modal}>
          <div className="content" />
        </Spin>
      ) : postReserveStatus === 200 ? (
        <Result
          status={"success"}
          title="予約が完了しました"
          subTitle={
            <div id="message" className="message-success">
              予約番号: {reservationId}
            </div>
          }
        />
      ) : (
        <Result
          status={"error"}
          style={style.modal}
          title="予約ができませんでした"
          subTitle={
            <div id="message" className="message-error">
              {postReserveStatus === 409
                ? "予約がいっぱいです"
                : "通信に失敗しました"}
            </div>
          }
        />
      )}
    </Modal>
  );
};

export default ReserveResultModal;

const style: Style = {
  modal: {
    height: "300px",
    verticalAlign: "middle",
  },
};
