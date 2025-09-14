// Gene Analysis Platform JavaScript

class GeneAnalysisPlatform {
    constructor() {
        this.currentGene = null;
        this.isAnalyzing = false;
        this.progressStep = 0;
        this.searchStrategies = [
            "Initializing analysis...",
            "Searching for RefSeqGene sequences (NG_)...",
            "Searching for genomic sequences (NC_, NT_)...", 
            "Searching for mRNA sequences (NM_)...",
            "Using gene ID for linked sequences...",
            "Fetching Ensembl transcript data...",
            "Analyzing exon structure..."
        ];
        
        // Sample gene data
        this.sampleGenes = {
            "PROS1": {
                "geneId": "5627",
                "symbol": "PROS1",
                "description": "Protein S alpha",
                "organism": "Homo sapiens",
                "chromosome": "3",
                "location": "3q11.1",
                "aliases": ["PS", "PROS", "Protein S"],
                "function": "Anticoagulant protein involved in blood coagulation regulation"
            },
            "BRCA1": {
                "geneId": "672",
                "symbol": "BRCA1", 
                "description": "BRCA1 DNA repair associated",
                "organism": "Homo sapiens",
                "chromosome": "17",
                "location": "17q21.31",
                "aliases": ["BRCC1", "FANCS", "IRIS", "PNCA4"],
                "function": "Tumor suppressor gene involved in DNA repair"
            },
            "TP53": {
                "geneId": "7157",
                "symbol": "TP53",
                "description": "Tumor protein p53", 
                "organism": "Homo sapiens",
                "chromosome": "17",
                "location": "17p13.1",
                "aliases": ["BCC7", "LFS1", "P53", "TRP53"],
                "function": "Tumor suppressor protein that regulates cell cycle"
            }
        };

        // Mock sequence data
        this.mockSequences = {
            "PROS1": {
                "genomic": {
                    "accession": "NG_009600",
                    "length": 80543,
                    "type": "RefSeqGene"
                },
                "mrna": [
                    {
                        "accession": "NM_001314077", 
                        "length": 3468,
                        "description": "Protein S alpha transcript variant 1"
                    },
                    {
                        "accession": "NM_000313",
                        "length": 3285,
                        "description": "Protein S alpha transcript variant 2"
                    }
                ],
                "exons": [
                    {"number": 1, "id": "ENSE00003839852", "start": 93973674, "end": 93973933, "length": 260, "strand": "-"},
                    {"number": 2, "id": "ENSE00001662236", "start": 93928702, "end": 93928797, "length": 96, "strand": "-"},
                    {"number": 3, "id": "ENSE00003576677", "start": 93927250, "end": 93927407, "length": 158, "strand": "-"},
                    {"number": 4, "id": "ENSE00003552504", "start": 93924240, "end": 93924264, "length": 25, "strand": "-"},
                    {"number": 5, "id": "ENSE00003499730", "start": 93910619, "end": 93910705, "length": 87, "strand": "-"},
                    {"number": 6, "id": "ENSE00003668418", "start": 93906021, "end": 93906143, "length": 123, "strand": "-"},
                    {"number": 7, "id": "ENSE00002341788", "start": 93905784, "end": 93905915, "length": 132, "strand": "-"},
                    {"number": 8, "id": "ENSE00002423295", "start": 93900804, "end": 93900929, "length": 126, "strand": "-"},
                    {"number": 9, "id": "ENSE00002387482", "start": 93898448, "end": 93898569, "length": 122, "strand": "-"},
                    {"number": 10, "id": "ENSE00002343485", "start": 93896576, "end": 93896691, "length": 116, "strand": "-"},
                    {"number": 11, "id": "ENSE00001142392", "start": 93892933, "end": 93893122, "length": 190, "strand": "-"},
                    {"number": 12, "id": "ENSE00002325994", "start": 93886336, "end": 93886503, "length": 168, "strand": "-"},
                    {"number": 13, "id": "ENSE00002400180", "start": 93884728, "end": 93884896, "length": 169, "strand": "-"},
                    {"number": 14, "id": "ENSE00002414667", "start": 93879163, "end": 93879314, "length": 152, "strand": "-"},
                    {"number": 15, "id": "ENSE00002413512", "start": 93876966, "end": 93877191, "length": 226, "strand": "-"},
                    {"number": 16, "id": "ENSE00003839182", "start": 93873124, "end": 93874405, "length": 1282, "strand": "-"}
                ]
            },
            "BRCA1": {
                "genomic": {
                    "accession": "NG_005905",
                    "length": 81189,
                    "type": "RefSeqGene"
                },
                "mrna": [
                    {
                        "accession": "NM_007294", 
                        "length": 7207,
                        "description": "BRCA1 DNA repair associated transcript variant 1"
                    }
                ],
                "exons": [
                    {"number": 1, "id": "ENSE00003660508", "start": 43044295, "end": 43045802, "length": 1508, "strand": "-"},
                    {"number": 2, "id": "ENSE00002319515", "start": 43047643, "end": 43047703, "length": 61, "strand": "-"}
                ]
            },
            "TP53": {
                "genomic": {
                    "accession": "NG_017013",
                    "length": 19149,
                    "type": "RefSeqGene"
                },
                "mrna": [
                    {
                        "accession": "NM_000546", 
                        "length": 2579,
                        "description": "Tumor protein p53 transcript variant 1"
                    }
                ],
                "exons": [
                    {"number": 1, "id": "ENSE00001894997", "start": 7661779, "end": 7661872, "length": 94, "strand": "-"},
                    {"number": 2, "id": "ENSE00001734474", "start": 7668402, "end": 7669689, "length": 1288, "strand": "-"}
                ]
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupCollapsibleSections();
    }

    bindEvents() {
        // Form submission
        const form = document.getElementById('gene-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.startAnalysis();
            });
        }

        // Retry button
        const retryBtn = document.getElementById('retry-analysis');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                this.resetAnalysis();
            });
        }

        // Toast close button
        const toastClose = document.getElementById('toast-close');
        if (toastClose) {
            toastClose.addEventListener('click', () => {
                this.hideToast();
            });
        }

        // Auto-hide toast after 5 seconds
        this.setupToastAutoHide();
    }

    setupToastAutoHide() {
        let toastTimeout;
        const toast = document.getElementById('toast');
        if (!toast) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (toast.classList.contains('show')) {
                        clearTimeout(toastTimeout);
                        toastTimeout = setTimeout(() => {
                            this.hideToast();
                        }, 5000);
                    }
                }
            });
        });
        observer.observe(toast, { attributes: true });
    }

    setupCollapsibleSections() {
        document.querySelectorAll('.collapse-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.target;
                const content = document.getElementById(target);
                const icon = e.currentTarget.querySelector('.collapse-icon');
                
                if (!content || !icon) return;
                
                if (content.classList.contains('collapsed')) {
                    content.classList.remove('collapsed');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.textContent = '−';
                    btn.classList.remove('collapsed');
                } else {
                    content.classList.add('collapsed');
                    content.style.maxHeight = '0px';
                    icon.textContent = '+';
                    btn.classList.add('collapsed');
                }
            });
        });
    }

    async startAnalysis() {
        if (this.isAnalyzing) return;

        const geneInput = document.getElementById('gene-input');
        const emailInput = document.getElementById('email-input');
        
        if (!geneInput || !emailInput) {
            this.showError('Form elements not found');
            return;
        }

        const geneValue = geneInput.value.trim().toUpperCase();
        const emailValue = emailInput.value.trim();
        
        if (!this.validateInputs(geneValue, emailValue)) return;

        this.isAnalyzing = true;
        this.currentGene = this.findGeneData(geneValue);
        
        if (!this.currentGene) {
            this.showError('Gene not found. Please try PROS1, BRCA1, or TP53 for demo purposes.');
            return;
        }

        try {
            this.showLoadingState();
            await this.runAnalysisSteps();
            this.displayResults();
            this.showSuccessToast('Analysis completed successfully!');
        } catch (error) {
            console.error('Analysis error:', error);
            this.showError('An error occurred during analysis. Please try again.');
        } finally {
            this.isAnalyzing = false;
        }
    }

    validateInputs(geneInput, emailInput) {
        if (!geneInput) {
            this.showError('Please enter a gene symbol or NCBI Gene ID.');
            return false;
        }

        if (!emailInput) {
            this.showError('Email address is required for NCBI API compliance.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            this.showError('Please enter a valid email address.');
            return false;
        }

        return true;
    }

    findGeneData(input) {
        // Check if input is a gene symbol
        if (this.sampleGenes[input]) {
            return input;
        }
        
        // Check if input is a gene ID
        for (const symbol in this.sampleGenes) {
            if (this.sampleGenes[symbol].geneId === input) {
                return symbol;
            }
        }
        
        return null;
    }

    showLoadingState() {
        // Hide other sections
        const resultsSection = document.getElementById('results-section');
        const errorSection = document.getElementById('error-section');
        
        if (resultsSection) resultsSection.classList.add('hidden');
        if (errorSection) errorSection.classList.add('hidden');
        
        // Show progress section
        const progressSection = document.getElementById('progress-section');
        if (progressSection) progressSection.classList.remove('hidden');
        
        // Update button state
        const btn = document.getElementById('start-analysis');
        const btnText = btn?.querySelector('.btn-text');
        const btnLoading = btn?.querySelector('.btn-loading');
        
        if (btnText) btnText.classList.add('hidden');
        if (btnLoading) btnLoading.classList.remove('hidden');
        if (btn) btn.disabled = true;
    }

    async runAnalysisSteps() {
        const progressSteps = document.getElementById('progress-steps');
        const progressFill = document.getElementById('progress-fill');
        
        if (!progressSteps || !progressFill) {
            throw new Error('Progress elements not found');
        }
        
        progressSteps.innerHTML = '';
        
        for (let i = 0; i < this.searchStrategies.length; i++) {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'progress-step active';
            stepDiv.innerHTML = `
                <span class="step-icon">${i + 1}</span>
                <span class="step-text">${this.searchStrategies[i]}</span>
            `;
            progressSteps.appendChild(stepDiv);
            
            // Update progress bar
            const progress = ((i + 1) / this.searchStrategies.length) * 100;
            progressFill.style.width = `${progress}%`;
            
            // Simulate processing time
            await this.delay(600 + Math.random() * 300);
            
            // Mark step as completed
            stepDiv.classList.remove('active');
            stepDiv.classList.add('completed');
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    displayResults() {
        this.hideLoadingState();
        
        // Show results section
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
            resultsSection.classList.add('fade-in');
        }
        
        // Populate gene information
        this.populateGeneInfo();
        this.populateSequences();
        this.populateExonTable();
        this.setupDownloads();
        
        // Ensure collapsible sections have proper max-height
        setTimeout(() => {
            document.querySelectorAll('.collapsible-content').forEach(content => {
                if (!content.classList.contains('collapsed')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }, 100);
    }

    populateGeneInfo() {
        const gene = this.sampleGenes[this.currentGene];
        const geneInfoDiv = document.getElementById('gene-info');
        
        if (!geneInfoDiv || !gene) return;
        
        geneInfoDiv.innerHTML = `
            <div class="gene-detail">
                <span class="gene-detail-label">Gene Symbol:</span>
                <span class="gene-detail-value">${gene.symbol}</span>
            </div>
            <div class="gene-detail">
                <span class="gene-detail-label">NCBI Gene ID:</span>
                <span class="gene-detail-value">${gene.geneId}</span>
            </div>
            <div class="gene-detail">
                <span class="gene-detail-label">Description:</span>
                <span class="gene-detail-value">${gene.description}</span>
            </div>
            <div class="gene-detail">
                <span class="gene-detail-label">Organism:</span>
                <span class="gene-detail-value">${gene.organism}</span>
            </div>
            <div class="gene-detail">
                <span class="gene-detail-label">Chromosome:</span>
                <span class="gene-detail-value">${gene.chromosome}</span>
            </div>
            <div class="gene-detail">
                <span class="gene-detail-label">Location:</span>
                <span class="gene-detail-value">${gene.location}</span>
            </div>
            <div class="gene-detail">
                <span class="gene-detail-label">Function:</span>
                <span class="gene-detail-value">${gene.function}</span>
            </div>
            <div class="gene-detail">
                <span class="gene-detail-label">Aliases:</span>
                <span class="gene-detail-value">${gene.aliases.join(', ')}</span>
            </div>
        `;
    }

    populateSequences() {
        const sequences = this.mockSequences[this.currentGene];
        if (!sequences) return;
        
        // Populate genomic sequences
        const genomicList = document.getElementById('genomic-list');
        if (genomicList) {
            genomicList.innerHTML = `
                <div class="sequence-item">
                    <div class="sequence-header">
                        <span class="sequence-accession">${sequences.genomic.accession}</span>
                        <span class="sequence-type">${sequences.genomic.type}</span>
                    </div>
                    <div class="sequence-description">Complete genomic sequence</div>
                    <div class="sequence-length">${sequences.genomic.length.toLocaleString()} bp</div>
                </div>
            `;
        }
        
        // Populate mRNA sequences
        const mrnaList = document.getElementById('mrna-list');
        if (mrnaList) {
            mrnaList.innerHTML = sequences.mrna.map(seq => `
                <div class="sequence-item">
                    <div class="sequence-header">
                        <span class="sequence-accession">${seq.accession}</span>
                        <span class="sequence-type">mRNA</span>
                    </div>
                    <div class="sequence-description">${seq.description}</div>
                    <div class="sequence-length">${seq.length.toLocaleString()} bp</div>
                </div>
            `).join('');
        }
    }

    populateExonTable() {
        const sequences = this.mockSequences[this.currentGene];
        const tableBody = document.getElementById('exon-table-body');
        
        if (!sequences || !tableBody) return;
        
        tableBody.innerHTML = sequences.exons.map(exon => `
            <tr>
                <td>${exon.number}</td>
                <td><code>${exon.id}</code></td>
                <td>${exon.start.toLocaleString()}</td>
                <td>${exon.end.toLocaleString()}</td>
                <td>${exon.length}</td>
                <td>${exon.strand}</td>
            </tr>
        `).join('');
    }

    setupDownloads() {
        const downloadGrid = document.getElementById('download-grid');
        if (!downloadGrid) return;

        const gene = this.sampleGenes[this.currentGene];
        const sequences = this.mockSequences[this.currentGene];
        
        const downloads = [
            {
                name: 'Genomic FASTA',
                size: `${Math.round(sequences.genomic.length / 1024)} KB`,
                description: 'Complete genomic sequence in FASTA format',
                filename: `${gene.symbol}_genomic.fa`,
                type: 'genomic'
            },
            {
                name: 'mRNA FASTA',
                size: `${Math.round(sequences.mrna.reduce((acc, seq) => acc + seq.length, 0) / 1024)} KB`,
                description: 'All transcript sequences in FASTA format',
                filename: `${gene.symbol}_mrna.fa`,
                type: 'mrna'
            },
            {
                name: 'Exon Data',
                size: '2 KB',
                description: 'Detailed exon positions and annotations in CSV format',
                filename: `${gene.symbol}_exons.csv`,
                type: 'exon'
            },
            {
                name: 'Gene Summary',
                size: '1 KB',
                description: 'Complete analysis summary report',
                filename: `${gene.symbol}_summary.txt`,
                type: 'summary'
            }
        ];
        
        downloadGrid.innerHTML = downloads.map(download => `
            <div class="download-item">
                <div class="download-header">
                    <span class="download-name">${download.name}</span>
                    <span class="download-size">${download.size}</span>
                </div>
                <div class="download-description">${download.description}</div>
                <button class="btn btn--primary download-btn" 
                        onclick="platform.downloadFile('${download.filename}', '${download.type}')">
                    Download ${download.name}
                </button>
            </div>
        `).join('');
    }

    downloadFile(filename, type) {
        let content = '';
        
        switch (type) {
            case 'genomic':
                content = this.generateGenomicFASTA();
                break;
            case 'mrna':
                content = this.generateMRNAFASTA();
                break;
            case 'exon':
                content = this.generateExonCSV();
                break;
            case 'summary':
                content = this.generateSummaryReport();
                break;
            default:
                content = 'File content not available';
        }

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showSuccessToast(`Downloaded ${filename} successfully!`);
    }

    generateGenomicFASTA() {
        const gene = this.sampleGenes[this.currentGene];
        const sequences = this.mockSequences[this.currentGene];
        
        return `>${sequences.genomic.accession} ${gene.description} genomic sequence
ATGCGTACGTAGCTACGATCGATCGATCGATCGATCGATCGATCGTAGCTAGCTAG
CGATCGATCGATCGATCGATCGTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA
GCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGA
TCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGA
TCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGA`;
    }

    generateMRNAFASTA() {
        const gene = this.sampleGenes[this.currentGene];
        const sequences = this.mockSequences[this.currentGene];
        
        return sequences.mrna.map(seq => 
            `>${seq.accession} ${seq.description}
ATGCGTACGTAGCTACGATCGATCGATCGATCGATCGATCGATCGTAGCTAGCTAG
CGATCGATCGATCGATCGATCGTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA
GCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGA`
        ).join('\n\n');
    }

    generateExonCSV() {
        const sequences = this.mockSequences[this.currentGene];
        
        let csv = 'Exon Number,Ensembl ID,Start Position,End Position,Length (bp),Strand\n';
        csv += sequences.exons.map(exon => 
            `${exon.number},${exon.id},${exon.start},${exon.end},${exon.length},${exon.strand}`
        ).join('\n');
        
        return csv;
    }

    generateSummaryReport() {
        const gene = this.sampleGenes[this.currentGene];
        const sequences = this.mockSequences[this.currentGene];
        
        return `Gene Analysis Summary Report
Generated: ${new Date().toLocaleString()}

=== GENE INFORMATION ===
Symbol: ${gene.symbol}
NCBI Gene ID: ${gene.geneId}
Description: ${gene.description}
Organism: ${gene.organism}
Chromosome: ${gene.chromosome}
Location: ${gene.location}
Function: ${gene.function}
Aliases: ${gene.aliases.join(', ')}

=== SEQUENCE INFORMATION ===
Genomic Sequence: ${sequences.genomic.accession} (${sequences.genomic.length.toLocaleString()} bp)
mRNA Sequences: ${sequences.mrna.length} transcripts found
Total Exons: ${sequences.exons.length}

=== EXON SUMMARY ===
${sequences.exons.map(exon => `Exon ${exon.number}: ${exon.start}-${exon.end} (${exon.length} bp, strand ${exon.strand})`).join('\n')}

Analysis completed successfully.`;
    }

    hideLoadingState() {
        // Hide progress section
        const progressSection = document.getElementById('progress-section');
        if (progressSection) progressSection.classList.add('hidden');
        
        // Reset button state
        const btn = document.getElementById('start-analysis');
        const btnText = btn?.querySelector('.btn-text');
        const btnLoading = btn?.querySelector('.btn-loading');
        
        if (btnText) btnText.classList.remove('hidden');
        if (btnLoading) btnLoading.classList.add('hidden');
        if (btn) btn.disabled = false;
    }

    showError(message) {
        this.hideLoadingState();
        
        // Hide other sections
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) resultsSection.classList.add('hidden');
        
        // Show error section
        const errorSection = document.getElementById('error-section');
        const errorMessage = document.getElementById('error-message');
        if (errorSection) errorSection.classList.remove('hidden');
        if (errorMessage) errorMessage.textContent = message;
        
        this.showErrorToast(message);
        this.isAnalyzing = false;
    }

    resetAnalysis() {
        // Hide all result sections
        const progressSection = document.getElementById('progress-section');
        const resultsSection = document.getElementById('results-section');
        const errorSection = document.getElementById('error-section');
        
        if (progressSection) progressSection.classList.add('hidden');
        if (resultsSection) resultsSection.classList.add('hidden');
        if (errorSection) errorSection.classList.add('hidden');
        
        // Clear form
        const form = document.getElementById('gene-form');
        if (form) form.reset();
        
        // Reset state
        this.currentGene = null;
        this.isAnalyzing = false;
        this.progressStep = 0;
    }

    showSuccessToast(message) {
        this.showToast(message, 'success');
    }

    showErrorToast(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        if (!toast || !toastMessage) return;
        
        toastMessage.textContent = message;
        toast.className = `toast ${type} show`;
    }

    hideToast() {
        const toast = document.getElementById('toast');
        if (toast) toast.classList.remove('show');
    }
}

// Initialize the platform when the page loads
let platform;
document.addEventListener('DOMContentLoaded', () => {
    platform = new GeneAnalysisPlatform();
});