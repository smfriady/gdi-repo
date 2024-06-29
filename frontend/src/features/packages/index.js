import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import { Modal } from '../../components'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import moment from 'moment-timezone'
import { useNavigate } from 'react-router-dom'

const initPayload = {
  namaPengirim: '',
  alamatPengirim: '',
  namaPenerima: '',
  alamatPenerima: '',
  ekspedisiId: '',
  tanggalPembuatan: '',
  status: 'Dikirim',
}

const PackagesPage = () => {
  const nav = useNavigate()
  const [payload, setPayload] = useState(initPayload)
  const [dataPackage, setDataPackage] = useState([])
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dataExpedition, serDataExpedition] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)

  const handleChange = (e) => {
    setPayload((prev) => ({
      ...prev,
      ...{
        [e.target.name]: e.target.value,
      },
    }))
  }

  const columns = [
    {
      name: 'ID Paket',
      selector: (row) => row.id,
    },
    {
      name: 'Nama Pengirim',
      selector: (row) => row.namaPengirim,
    },
    {
      name: 'Alamat Pengirim',
      selector: (row) => row.alamatPengirim,
    },
    {
      name: 'Nama Penerima',
      selector: (row) => row.namaPenerima,
    },
    {
      name: 'Alamat Penerima',
      selector: (row) => row.alamatPenerima,
    },
    {
      name: 'Ekspedisi',
      selector: (row) => row.ekspedisi.namaEkspedisi,
    },
    {
      name: 'Tanggal Pembuatan',
      selector: (row) => {
        return `${moment(row.tanggalPembuatan).format('Do MMMM YYYY')}`
      },
    },
    {
      name: 'Status',
      selector: (row) => row.status,
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className="d-flex flex-column gap-1 my-1">
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              setIsOpenEdit(true)
              setSelectedRow(row)
            }}
          >
            Ubah
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() => {
              handleDelete(row?.id)
            }}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ]

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/packages`)
      const result = await response.json()
      if (response.ok) {
        setDataPackage(result.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchExpedition = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.REACT_APP_ENDPOINT}/expeditions`
      )
      const result = await response.json()
      if (response.ok) {
        serDataExpedition(result.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let finalData = {
      ...payload,
    }

    finalData.tanggalPembuatan = new Date(finalData.tanggalPembuatan)

    try {
      setIsLoading(true)

      if (isOpenModal) {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT}/packages`,
          {
            method: 'POST',
            body: JSON.stringify(finalData),
            headers: { 'Content-Type': 'application/json' },
          }
        )

        if (response.ok) {
          fetchData()
          setIsOpenModal(false)
          setPayload(initPayload)
        }
      }

      if (isOpenEdit) {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT}/packages/${finalData?.id}`,
          {
            method: 'PUT',
            body: JSON.stringify(finalData),
            headers: { 'Content-Type': 'application/json' },
          }
        )

        if (response.ok) {
          fetchData()
          setIsOpenEdit(false)
          setPayload(initPayload)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (e) => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.REACT_APP_ENDPOINT}/packages/${e}`,
        {
          method: 'DELETE',
        }
      )
      if (response.ok) {
        fetchData()
        setIsOpenModal(false)
        setPayload((prev) => Object.assign(prev, initPayload))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const isObjectEmpty = (obj) => {
    for (const key in obj) {
      if (obj[key] === '') {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchExpedition()
  }, [])

  useEffect(() => {
    let finalRow = selectedRow
    let date = new Date(finalRow?.tanggalPembuatan)
    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, '0')
    let day = String(date.getDate()).padStart(2, '0')
    if (isOpenEdit) {
      setPayload({
        ...finalRow,
        tanggalPembuatan: `${year}-${month}-${day}`,
      })
    }
  }, [isOpenEdit, selectedRow])

  return (
    <>
      <Modal
        title={
          isOpenEdit
            ? `Formulir ubah paket`
            : isOpenModal
            ? `Formulir tambah paket`
            : ''
        }
        size="xl"
        isOpenModal={isOpenModal}
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        setIsOpenModal={setIsOpenModal}
      >
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FormGroup>
                <Label for="namaPengirim">Nama Pengirim</Label>
                <Input
                  id="namaPengirim"
                  name="namaPengirim"
                  placeholder="Nama Pengirim"
                  type="text"
                  onChange={handleChange}
                  value={payload?.namaPengirim}
                />
              </FormGroup>
              <FormGroup>
                <Label for="alamatPengirim">Alamat Pengirim</Label>
                <Input
                  id="alamatPengirim"
                  name="alamatPengirim"
                  placeholder="Alamat Pengirim"
                  type="textarea"
                  onChange={handleChange}
                  value={payload?.alamatPengirim}
                />
              </FormGroup>
              <FormGroup>
                <Label for="ekspedisiId">Ekspedisi</Label>
                <Input
                  id="ekspedisiId"
                  name="ekspedisiId"
                  placeholder="Ekspedisi"
                  type="select"
                  onChange={handleChange}
                  value={payload?.ekspedisiId}
                >
                  <option value="">Pilih Ekspedisi</option>
                  {dataExpedition?.map((e, i) => (
                    <option value={e?.id} key={i}>
                      {e?.namaEkspedisi}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  placeholder="status"
                  type="select"
                  onChange={handleChange}
                  value={payload?.status}
                >
                  <option value="Dikirim">Dikirim</option>
                  <option value="Dalam Perjalanan">Dalam Perjalanan</option>
                  <option value="Tiba di Tujuan">Tiba di Tujuan</option>
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="namaPenerima">Nama Penerima</Label>
                <Input
                  id="namaPenerima"
                  name="namaPenerima"
                  placeholder="Nama Penerima"
                  type="text"
                  onChange={handleChange}
                  value={payload?.namaPenerima}
                />
              </FormGroup>
              <FormGroup>
                <Label for="alamatPenerima">Alamat Penerima</Label>
                <Input
                  id="alamatPenerima"
                  name="alamatPenerima"
                  placeholder="Alamat Penerima"
                  type="textarea"
                  onChange={handleChange}
                  value={payload?.alamatPenerima}
                />
              </FormGroup>
              <FormGroup>
                <Label for="tanggalPembuatan">Tanggal Dibuat</Label>
                <Input
                  id="tanggalPembuatan"
                  name="tanggalPembuatan"
                  placeholder="Nama Pengirim"
                  type="date"
                  onChange={handleChange}
                  value={payload?.tanggalPembuatan}
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="d-flex flex-rows gap-2">
            <Button
              color="primary"
              className="w-50"
              type="submit"
              disabled={isLoading || isObjectEmpty(payload)}
            >
              {isOpenEdit && 'Ubah'}
              {isOpenModal && 'Tambah'}
            </Button>
            <Button
              color="secondary"
              className="w-50"
              onClick={() => {
                setIsOpenEdit(false)
                setIsOpenModal(false)
                setPayload(initPayload)
              }}
              disabled={isLoading}
            >
              Batal
            </Button>
          </div>
        </Form>
      </Modal>
      {/* Tabel Content */}
      <Container>
        <Button size="sm" className="mb-3" onClick={() => nav('/reports')}>
          Ke Halaman Reports
        </Button>
        <DataTable
          columns={columns}
          data={dataPackage}
          className="border p-0 border-1 rounded-top"
          striped={true}
        />
      </Container>
    </>
  )
}

export default PackagesPage
