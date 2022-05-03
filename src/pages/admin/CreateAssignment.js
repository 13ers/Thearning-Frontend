import '../../style/index.css';
import { ImCross } from "react-icons/im";


function CreateAssignment() {

    //define state

    return (
        <div className="wrapper v2">
            <div>
                <div>
                    <div>
                        <div>
                            <h4 className="fw-bold">Tambah Kelas</h4>
                            <ImCross className="exit"/>
                            <hr/>
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label"> Nama Tugas</label>
                                            <input type="text" className="form-control" placeholder="Masukkan Nama Tugas"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Topik</label>
                                            <input type="text" className="form-control"  placeholder="Masukkan Topic"/>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Instruksi</label>
                                            <input type="text" className="form-control"  placeholder="Masukkan Instruksi"/>
                                        </div>
                                        </div>
                                    <div className="col-md-6">
                                    <div className="mb-3">
                                    <label className="form-label">Nilai</label>
                                    <select name="marks" id="marks">
                                        <option value="100">Dengan Nilai</option>
                                        <option value="0">Tanpa Nilai</option>
                                    </select>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Buat</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateAssignment;