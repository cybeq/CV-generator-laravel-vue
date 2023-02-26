<?php

namespace App\Http\Controllers;

use DOMDocument;
use Illuminate\Http\Request;
use Dompdf\Dompdf;
use Illuminate\Http\Response;
use TCPDF;

class PDFController extends Controller
{

    public function makeHTML(Request $request){
        //here we go when we collect all the necessary data
    }
    public function generate(Request $request)
    {

        // get the raw input stream data containing the HTML content
        $htmlContent = file_get_contents('php://input');

        $pdfFilename = 'pdf.pdf'; // The filename and extension of the PDF file
        $pdfPath = public_path('pdf/' . $pdfFilename); // The fully qualified path to the PDF file

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
        $pdf->SetFont('dejavusans', '', 10);
        $pdf->AddPage();
        $pdf->writeHTML($htmlContent, true, false, true, false, '');
        $pdf->Output($pdfPath, 'F'); // Save the PDF file to $pdfPath

        return response()->download($pdfPath, $pdfFilename);


//        // write the PDF content to a file
//        $filePath = public_path('pdf/' . $fileName);

    }
}
