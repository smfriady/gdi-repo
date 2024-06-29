import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import moment from 'moment-timezone'
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const initPayload = {
  ekspedisiId: '',
  tanggalPembuatan: '',
}

const ReportPage = () => {
  const nav = useNavigate()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [payload, setPayload] = useState(initPayload)
  const [dataExpedition, serDataExpedition] = useState([])

  const columns = [
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
  ]

  const fetchData = async () => {
    let url = new URL(`${process.env.REACT_APP_ENDPOINT}/reports`)

    let queryParams = {
      tanggalPembuatan: payload?.tanggalPembuatan,
      ekspedisiId: payload.ekspedisiId,
    }

    for (let key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        if (queryParams[key] === undefined) {
          continue
        } else if (queryParams[key] === '') {
          continue
        } else {
          url.searchParams.set(key, queryParams[key])
        }
      }
    }
    let endPoint = url.toString()

    try {
      setIsLoading(true)
      const response = await fetch(endPoint)
      const result = await response.json()

      if (response.ok) {
        setData(result.data)
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

  const handleChange = (e) => {
    setPayload((prev) => ({
      ...prev,
      ...{
        [e.target.name]: e.target.value,
      },
    }))
  }

  useEffect(() => {
    fetchData()
  }, [payload])

  useEffect(() => {
    fetchExpedition()
  }, [])

  return (
    <>
      <Container className="p-2">
        <h3 className="text-center">Laporan</h3>
        <Row>
          <Col sm="6">
            <FormGroup>
              <Label for="ekspedisiId">Ekspedisi</Label>
              <Input
                id="ekspedisiId"
                name="ekspedisiId"
                placeholder="Ekspedisi"
                type="select"
                onChange={handleChange}
                value={payload?.ekspedisiId}
                disabled={isLoading}
              >
                <option value="">Pilih Ekspedisi</option>
                {dataExpedition?.map((e, i) => (
                  <option value={e?.id} key={i}>
                    {e?.namaEkspedisi}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Button size="sm" className="mb-3" onClick={() => nav('/packages')}>
              Ke Halaman Paket
            </Button>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="tanggalPembuatan">Tanggal Dibuat</Label>
              <Input
                id="tanggalPembuatan"
                name="tanggalPembuatan"
                placeholder="Nama Pengirim"
                type="date"
                onChange={handleChange}
                value={payload?.tanggalPembuatan}
                disabled={isLoading}
              />
            </FormGroup>
          </Col>
        </Row>

        <DataTable
          columns={columns}
          data={data}
          className="border p-0 border-1 rounded-top"
          striped={true}
        />
      </Container>
    </>
  )
}

export default ReportPage
