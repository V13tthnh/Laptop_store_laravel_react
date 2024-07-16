import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function Modal(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="btn-detail btn-short-spec not-have-instruction"
        style={{ marginLeft: "100px" }}
      >
        Xem thông cấu hình chi tiết
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cấu hình chi tiết</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="content-t-wrap">
              <div className="parameter-all">
                <div className="parameter-item">
                  <p
                    className="parameter-ttl"
                    data-group-id="32"
                    data-index="1"
                  >
                    Bộ xử lý
                  </p>
                  <ul className="ulist ">
                    <li data-id="28727" data-group-id="32" data-index="1">
                      <div className="ctLeft">
                        <p>Công nghệ CPU:</p>
                      </div>
                      <div className="ctRight">
                        <span className="">{props.data[0]?.value}</span>
                      </div>
                    </li>
                    <li data-id="28859" data-group-id="32" data-index="4">
                      <div className="ctLeft">
                        <p>Số nhân:</p>
                      </div>
                      <div className="ctRight">
                        <span className=""> {props.data[1]?.value}</span>
                      </div>
                    </li>
                    <li data-id="28860" data-group-id="32" data-index="5">
                      <div className="ctLeft">
                        <p>Số luồng:</p>
                      </div>
                      <div className="ctRight">
                        <span className=""> {props.data[2]?.value}</span>
                      </div>
                    </li>
                    <li data-id="93" data-group-id="32" data-index="6">
                      <div className="ctLeft">
                        <p>Tốc độ CPU:</p>
                      </div>
                      <div className="ctRight">
                        <span className=""> {props.data[3]?.value}</span>
                      </div>
                    </li>
                    <li data-id="97" data-group-id="32" data-index="7">
                      <div className="ctLeft">
                        <p>Tốc độ tối đa:</p>
                      </div>
                      <div className="ctRight">{props.data[4]?.value}</div>
                    </li>
                    <li data-id="28861" data-group-id="32" data-index="8">
                      <div className="ctLeft">
                        <p>Bộ nhớ đệm:</p>
                      </div>
                      <div className="ctRight">
                        <span className=""> {props.data[5]?.value}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="parameter-item">
                  <p
                    className="parameter-ttl"
                    data-group-id="34"
                    data-index="3"
                  >
                    Bộ nhớ RAM, Ổ cứng
                  </p>
                  <ul className="ulist ">
                    <li data-id="146" data-group-id="34" data-index="1">
                      <div className="ctLeft">
                        <p>RAM:</p>
                      </div>
                      <div className="ctRight">{props.data[6]?.value}</div>
                    </li>
                    <li data-id="149" data-group-id="34" data-index="2">
                      <div className="ctLeft">
                        <p>Loại RAM:</p>
                      </div>
                      <div className="ctRight">
                        <span className=""> {props.data[7]?.value}</span>
                      </div>
                    </li>
                    <li data-id="155" data-group-id="34" data-index="3">
                      <div className="ctLeft">
                        <p>Tốc độ Bus RAM:</p>
                      </div>
                      <div className="ctRight">
                        <span className=""> {props.data[8]?.value}</span>
                      </div>
                    </li>
                    <li data-id="137" data-group-id="34" data-index="4">
                      <div className="ctLeft">
                        <p>Hỗ trợ RAM tối đa:</p>
                      </div>
                      <div className="ctRight">
                        <span className=""> {props.data[9]?.value}</span>
                      </div>
                    </li>
                    <li data-id="184" data-group-id="34" data-index="5">
                      <div className="ctLeft">
                        <p>Ổ cứng:</p>
                      </div>
                      <div className="ctRight">
                        <span className=""> {props.data[10]?.value}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="parameter-item">
                  <p
                    className="parameter-ttl"
                    data-group-id="52"
                    data-index="4"
                  >
                    Màn hình
                  </p>
                  <ul className="ulist ">
                    <li data-id="187" data-group-id="52" data-index="1">
                      <div className="ctLeft">
                        <p>Màn hình:</p>
                      </div>
                      <div className="ctRight">
                        <span className=""> {props.data[11]?.value}</span>
                      </div>
                    </li>
                    <li data-id="189" data-group-id="52" data-index="2">
                      <div className="ctLeft">
                        <p>Độ phân giải:</p>
                      </div>
                      <div className="ctRight">
                        <span className="">{props.data[12]?.value}</span>
                      </div>
                    </li>
                    <li data-id="29056" data-group-id="52" data-index="3">
                      <div className="ctLeft">
                        <p>Tần số quét:</p>
                      </div>
                      <div className="ctRight">{props.data[13]?.value}</div>
                    </li>
                    <li data-id="41425" data-group-id="52" data-index="4">
                      <div className="ctLeft">
                        <p>Độ phủ màu:</p>
                      </div>
                      <div className="ctRight">
                        <span className="">{props.data[14]?.value}</span>
                      </div>
                    </li>
                    <li data-id="186" data-group-id="52" data-index="5">
                      <div className="ctLeft">
                        <p>Công nghệ màn hình:</p>
                      </div>
                      <div className="ctRight">{props.data[15]?.value}</div>
                    </li>
                  </ul>
                </div>
                <div className="parameter-item">
                  <p
                    className="parameter-ttl"
                    data-group-id="53"
                    data-index="6"
                  >
                    Đồ họa và Âm thanh
                  </p>
                  <ul className="ulist ">
                    <li data-id="28123" data-group-id="53" data-index="0">
                      <div className="ctLeft">
                        <p>Card màn hình:</p>
                      </div>
                      <div className="ctRight">
                        <span className="">{props.data[16]?.value}</span>
                      </div>
                    </li>
                    <li data-id="196" data-group-id="53" data-index="3">
                      <div className="ctLeft">
                        <p>Công nghệ âm thanh:</p>
                      </div>
                      <div className="ctRight">{props.data[17]?.value}</div>
                    </li>
                  </ul>
                </div>
                <div className="parameter-item">
                  <p
                    className="parameter-ttl"
                    data-group-id="56"
                    data-index="7"
                  >
                    Cổng kết nối &amp; tính năng mở rộng
                  </p>
                  <ul className="ulist ">
                    <li data-id="200" data-group-id="56" data-index="1">
                      <div className="ctLeft">
                        <p>Cổng giao tiếp:</p>
                      </div>
                      <div className="ctRight">{props.data[18]?.value}</div>
                    </li>
                    <li data-id="206" data-group-id="56" data-index="4">
                      <div className="ctLeft">
                        <p>Kết nối không dây:</p>
                      </div>
                      <div className="ctRight">{props.data[19]?.value}</div>
                    </li>
                    <li data-id="223" data-group-id="56" data-index="7">
                      <div className="ctLeft">
                        <p>Webcam:</p>
                      </div>
                      <div className="ctRight">{props.data[21]?.value}</div>
                    </li>
                    <li data-id="201" data-group-id="56" data-index="9">
                      <div className="ctLeft">
                        <p>Tính năng khác:</p>
                      </div>
                      <div className="ctRight">{props.data[23]?.value}</div>
                    </li>
                    <li data-id="10741" data-group-id="56" data-index="10">
                      <div className="ctLeft">
                        <p>Đèn bàn phím:</p>
                      </div>
                      <div className="ctRight">
                        <span className="">{props.data[22]?.value}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="parameter-item">
                  <p
                    className="parameter-ttl"
                    data-group-id="62"
                    data-index="15"
                  >
                    Kích thước &amp; khối lượng
                  </p>
                  <ul className="ulist ">
                    <li data-id="7779" data-group-id="62" data-index="1">
                      <div className="ctLeft">
                        <p>Kích thước & khối lượng:</p>
                      </div>
                      <div className="ctRight">
                        <span className="">{props.data[24]?.value}</span>
                      </div>
                    </li>
                    <li data-id="7903" data-group-id="62" data-index="20">
                      <div className="ctLeft">
                        <p>Chất liệu:</p>
                      </div>
                      <div className="ctRight">
                        <span className="">{props.data[25]?.value}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="parameter-item">
                  <p
                    className="parameter-ttl"
                    data-group-id="60"
                    data-index="16"
                  >
                    Thông tin khác
                  </p>
                  <ul className="ulist ">
                    <li data-id="228" data-group-id="60" data-index="2">
                      <div className="ctLeft">
                        <p>Thông tin Pin:</p>
                      </div>
                      <div className="ctRight">
                        <span className=""> {props.data[26]?.value}</span>
                      </div>
                    </li>
                    <li data-id="40260" data-group-id="60" data-index="3">
                      <div className="ctLeft">
                        <p>Công suất bộ sạc:</p>
                      </div>
                      <div className="ctRight">
                        <span className="">{props.data[27]?.value}</span>
                      </div>
                    </li>
                    <li data-id="8599" data-group-id="60" data-index="4">
                      <div className="ctLeft">
                        <p>Hệ điều hành:</p>
                      </div>
                      <div className="ctRight">{props.data[28]?.value}</div>
                    </li>
                    <li data-id="22711" data-group-id="60" data-index="5">
                      <div className="ctLeft">
                        <p>Bảo hành:</p>
                      </div>
                      <div className="ctRight">
                        <span className="">{props.data[30]?.value}</span>
                      </div>
                    </li>
                    <li data-id="22711" data-group-id="60" data-index="5">
                      <div className="ctLeft">
                        <p>Thời điểm ra mắt:</p>
                      </div>
                      <div className="ctRight">
                        <span className="">{props.data[31]?.value}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
