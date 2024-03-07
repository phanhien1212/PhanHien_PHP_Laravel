import { useEffect, useState } from "react";
import { urlImage } from "../../../config";
import BannerService from "../../../service/BannerService";
const CreateBanner = () => {
    const [banners, setBanners] = useState("");
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);
    const [load, setLoad] = useState(Date.now());
    useEffect(() => {
        (async () => {
            const result = await BannerService.getList();
            setBanners(result.data.banners);
        })();
    }, [load]);


    const handSubmit = async (event) => {
        event.preventDefault();
        var image = document.getElementById("image");
        var banner = new FormData();
        banner.append("name", name);
        banner.append("description", description);
        banner.append("position", position);
        banner.append("link", link);
        banner.append("status", status);
        banner.append("image", image.files.length === 0 ? "" : image.files[0]);
        (async () => {
            const result = await BannerService.store(banner);
            if (result.data.status === true) {
                setLoad(Date.now());
            }
        })();
    }
    return (
        <div className="content">
             <form onSubmit={handSubmit}>
            <section className="content-header my-2">
                <h1 className="d-inline">Thêm banner</h1>
                <div className="text-end">
                    <a href="banner_index.html" className="btn btn-sm btn-success">
                        <i className="fa fa-arrow-left" /> Về danh sách
                    </a>
                </div>
            </section>
            <section className="content-body my-2">
                <div className="row">
                    <div className="col-md-9">
                        <div className="mb-3">
                            <label><strong>Tên banner (*)</strong></label>
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Nhập tên banner" />
                        </div>
                        <div className="mb-3">
                            <label><strong>Liên kết</strong></label>
                            <input type="text" name="link" value={link} onChange={(e) => setLink(e.target.value)} className="form-control" placeholder="Nhập liên kết" />
                        </div>
                        <div className="mb-3">
                            <label><strong>Mô tả (*)</strong></label>
                            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="form-control" placeholder="Nhập mô tả" defaultValue={""} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box-container mt-4 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Đăng</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <p>Chọn trạng thái đăng</p>
                                <select name="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value={1}>Xuất bản</option>
                                    <option value={2}>Chưa xuất bản</option>
                                </select>
                            </div>
                            <div className="box-footer text-end px-2 py-3">
                                <button type="submit" className="btn btn-success btn-sm text-end">
                                    <i className="fa fa-save" aria-hidden="true" /> Đăng
                                </button>
                            </div>
                        </div>
                        <div className="box-container mt-4 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Vị trí (*)</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <select name="position" className="form-select" value={position} onChange={(e) => setPosition(e.target.value)}>
                                    <option>Chọn vị trí</option>
                                    <option value="slideshow">Slide Show</option>
                                    <option value="ads">Quảng cáo</option>
                                </select>
                                <p className="pt-2">Vị trí hiển thị banner</p>
                            </div>
                        </div>
                        <div className="box-container mt-4 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                                <strong>Hình (*)</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                                <input type="file" name="image" id="image" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </form>
        </div>

    );
}

export default CreateBanner;