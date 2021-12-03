import React from 'react';
import { Popup, Button, Modal } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import downloadSVG from '@plone/volto/icons/download.svg';

const TableauDownload = (props) => {
  const [open, setOpen] = React.useState(false);
  const viz = props.viz.viz || {};

  const exportImage = () => {
    viz.showExportImageDialog();
  };

  const exportData = () => {
    viz.showExportDataDialog();
  };

  const exportToCSV = () => {
    viz.showExportCrossTabDialog();
  };

  const exportToExcel = () => {
    viz.exportCrossTabToExcel();
  };

  const exportToPDF = () => {
    viz.showExportPDFDialog();
  };

  const exportPowerPoint = () => {
    viz.showExportPowerPointDialog();
  };

  const exportWorkbook = () => {
    try {
      viz.showDownloadWorkbookDialog();
    } catch (err) {
      setOpen(true);
    }
  };

  return (
    <>
      <Popup
        basic
        className="tableau-download-dialog"
        position="top center"
        on="click"
        trigger={
          <div className="toolbar-button-wrapper">
            <Button className="toolbar-button" title="Download">
              <Icon name={downloadSVG} size="26px" />
            </Button>
            <span className="btn-text">Save</span>
          </div>
        }
      >
        <Popup.Header>Download</Popup.Header>
        <Popup.Content>
          <p>Select your file format.</p>
          <Button onClick={exportImage}>Image</Button>
          <Button onClick={exportData}>Data</Button>
          <Button onClick={exportToCSV}>CSV</Button>
          <Button onClick={exportToExcel}>Excel</Button>
          <Button onClick={exportToPDF}>PDF</Button>
          <Button onClick={exportPowerPoint}>PowerPoint</Button>
          <Button onClick={exportWorkbook}>Tableau Workbook</Button>
        </Popup.Content>
      </Popup>

      <Modal onClose={() => setOpen(false)} open={open}>
        <Modal.Content>
          Permissions are required to download the workbook.
        </Modal.Content>

        <Modal.Actions>
          <Button primary onClick={() => setOpen(false)}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default TableauDownload;
