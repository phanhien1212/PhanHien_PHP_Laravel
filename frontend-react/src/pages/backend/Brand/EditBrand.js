import { useEffect, useState } from "react";
import BrandService from "../../../service/BrandService";
import { Link, useParams } from "react-router-dom";
import { urlImage } from "../../../config";

const EditBrand = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState(1);
  const [load, setLoad] = useState(Date.now());

  useEffect(() => {
    (async () => {
      const result = await BrandService.getById(id);
      const brandData = result.data.brand;
        setName(brandData.name);
        setSlug(brandData.slug);
        setDescription(brandData.description);
        setStatus(brandData.status);
        setImageUrl(`${urlImage}brand/${brandData.image}`);
    })();
  }, [id,load]);

  const handSubmit = async (event) => {
    event.preventDefault();

    var image = document.getElementById("image");
    var brand = new FormData();
    brand.append("name", name);
    brand.append("description", description);
    brand.append("status", status);
    brand.append("image", image.files.length === 0 ? "" : image.files[0]);


    const result = await BrandService.update(id, brand);
    console.log(result.data); // Log response từ API để kiểm tra lỗi
    if (result.data.status === true) {

      setLoad(Date.now());
    }

  };

  const handleImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
};
  return (
    <div>
      <section className="content-header my-2">
        <h1 className="d-inline">Cập nhật thương hiệu</h1>
        <div className="text-end">
          <Link to="/admin/brand/" className="btn btn-sm btn-success">
            <i className="fa fa-arrow-left" /> Về danh sách
          </Link>
        </div>
      </section>
      <section className="content-body my-2">
        <form onSubmit={handSubmit} >
          <div className="row">

            <div className="col-md-9">
              <div className="mb-3">
                <label><strong>Tên thương hiệu (*)</strong></label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="name" name="name" className="form-control" required />
              </div>
              <div className="mb-3">
                <label><strong>Slug</strong></label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} type="text" name="slug" className="form-control" />
              </div>
              <div className="mb-3">
                <label><strong>Mô tả</strong></label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" className="form-control" defaultValue={""} />
              </div>

            </div>
            <div className="col-md-3">
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Đăng</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <p>Chọn trạng thái đăng</p>
                  <select name="status" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
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

              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Hình đại diện</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <input type="file" onChange={handleImageChange} id="image" name="image" className="form-control" />  {imageUrl && <img src={imageUrl} alt="Brand Image" />}
                </div>
              </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Thứ tự</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <select name="sort_order" className="form-control">
                    <option value>Sau</option>
                    <option value={2}>sau</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </form>
      </section>
    </div>

  );
}

export default EditBrand;