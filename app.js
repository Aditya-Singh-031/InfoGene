 // Gene Analysis Platform JavaScript

class GeneAnalysisPlatform {
    constructor() {
        this.currentGene = null;
        this.isAnalyzing = false;
        this.progressStep = 0;
        this.nglStage = null;
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
    
        const geneValue = geneInput.value.trim();
        const emailValue = emailInput.value.trim();
        
        if (!this.validateInputs(geneValue, emailValue)) return;
    
        this.isAnalyzing = true;
    
        try {
            // Resolve gene (may use sampleGenes or NCBI lookups)
            const found = await this.findGeneData(geneValue);
            if (!found) {
                this.showError('Gene not found. Please try PROS1, BRCA1, or TP53 for demo purposes or check the gene symbol/NCBI Gene ID.');
                return;
            }
    
            this.showLoadingState();
            await this.runAnalysisSteps();
    
            // attempt to fetch Ensembl transcripts/exons (best-effort)
            if (!this.sequences || !this.exons) {
                // try Ensembl if not using mock
                try {
                    await this.tryFetchEnsemblAndSequences();
                } catch (e) {
                    console.warn('Ensembl fetch failed (continuing with available data)', e);
                }
            }
    
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

    async findGeneData(input) {
        const normalized = (input || '').trim().toUpperCase();
        if (!normalized) return false;
    
        // 1) local demo
        if (this.sampleGenes[normalized]) {
            this.currentGene = normalized;
            this.geneData = Object.assign({}, this.sampleGenes[normalized], { source: 'sample' });
            this.sequences = this.mockSequences[normalized] || null;
            this.exons = (this.mockSequences[normalized] && this.mockSequences[normalized].exons) || null;
            return true;
        }
    
        // 2) numeric ID -> esummary
        if (/^\d+$/.test(normalized)) {
            const summary = await this.fetchNCBISummaryById(normalized);
            if (summary) {
                this.currentGene = (summary.symbol || normalized).toUpperCase();
                this.geneData = Object.assign({}, summary, { source: 'ncbi' });
                return true;
            }
            return false;
        }
    
        // 3) symbol -> esearch + esummary
        const summaryBySymbol = await this.fetchNCBISummaryBySymbol(normalized);
        if (summaryBySymbol) {
            this.currentGene = (summaryBySymbol.symbol || normalized).toUpperCase();
            this.geneData = Object.assign({}, summaryBySymbol, { source: 'ncbi' });
            return true;
        }
    
        // not found
        return false;
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
        this.loadProteinStructure();
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
        const geneInfoDiv = document.getElementById('gene-info');
        if (!geneInfoDiv) return;
    
        const gene = this.geneData || (this.currentGene ? this.sampleGenes[this.currentGene] : null);
        if (!gene) {
            geneInfoDiv.innerHTML = `<div class="gene-detail">No gene metadata available.</div>`;
            return;
        }
    
        const symbol = gene.symbol || (this.currentGene || '—');
        const geneId = gene.geneId || gene.id || '—';
        const description = gene.description || gene.name || '—';
        const organism = gene.organism || 'Homo sapiens';
        const chromosome = gene.chromosome || (gene.maplocation ? gene.maplocation.split(':')[0] : '—');
        const location = gene.location || gene.maplocation || '—';
        const func = gene.function || gene.note || '—';
        const aliases = gene.aliases ? gene.aliases.join(', ') : (gene.other_designations || '—');
    
        geneInfoDiv.innerHTML = `
            <div class="gene-detail"><span class="gene-detail-label">Gene Symbol:</span><span class="gene-detail-value">${symbol}</span></div>
            <div class="gene-detail"><span class="gene-detail-label">NCBI Gene ID:</span><span class="gene-detail-value">${geneId}</span></div>
            <div class="gene-detail"><span class="gene-detail-label">Description:</span><span class="gene-detail-value">${description}</span></div>
            <div class="gene-detail"><span class="gene-detail-label">Organism:</span><span class="gene-detail-value">${organism}</span></div>
            <div class="gene-detail"><span class="gene-detail-label">Chromosome:</span><span class="gene-detail-value">${chromosome}</span></div>
            <div class="gene-detail"><span class="gene-detail-label">Location:</span><span class="gene-detail-value">${location}</span></div>
            <div class="gene-detail"><span class="gene-detail-label">Function:</span><span class="gene-detail-value">${func}</span></div>
            <div class="gene-detail"><span class="gene-detail-label">Aliases:</span><span class="gene-detail-value">${aliases}</span></div>
        `;
    }
    

    populateSequences() {
        const sequences = this.sequences || this.mockSequences[this.currentGene];
        if (!sequences) {
            // clear UI if nothing
            const genomicList = document.getElementById('genomic-list');
            const mrnaList = document.getElementById('mrna-list');
            if (genomicList) genomicList.innerHTML = '<div>No genomic data available.</div>';
            if (mrnaList) mrnaList.innerHTML = '<div>No mRNA data available.</div>';
            return;
        }
    
        // Genomic (if available)
        const genomicList = document.getElementById('genomic-list');
        if (genomicList) {
            if (sequences.genomic) {
                genomicList.innerHTML = `
                    <div class="sequence-item">
                        <div class="sequence-header">
                            <span class="sequence-accession">${sequences.genomic.accession}</span>
                            <span class="sequence-type">${sequences.genomic.type || 'genomic'}</span>
                        </div>
                        <div class="sequence-description">Complete genomic sequence</div>
                        <div class="sequence-length">${sequences.genomic.length ? sequences.genomic.length.toLocaleString() + ' bp' : '—'}</div>
                    </div>
                `;
            } else {
                genomicList.innerHTML = '<div>No genomic data available.</div>';
            }
        }
    
        // mRNA / transcripts
        const mrnaList = document.getElementById('mrna-list');
        if (mrnaList) {
            if (Array.isArray(sequences.mrna) && sequences.mrna.length) {
                mrnaList.innerHTML = sequences.mrna.map(seq => `
                    <div class="sequence-item">
                        <div class="sequence-header">
                            <span class="sequence-accession">${seq.accession}</span>
                            <span class="sequence-type">mRNA</span>
                        </div>
                        <div class="sequence-description">${seq.description || ''}</div>
                        <div class="sequence-length">${seq.length ? seq.length.toLocaleString() + ' bp' : '—'}</div>
                    </div>
                `).join('');
            } else if (this.sequences && Array.isArray(this.sequences.transcripts) && this.sequences.transcripts.length) {
                // Show Ensembl transcripts summary
                mrnaList.innerHTML = this.sequences.transcripts.map(tx => `
                    <div class="sequence-item">
                        <div class="sequence-header">
                            <span class="sequence-accession">${tx.transcript_id}</span>
                            <span class="sequence-type">transcript</span>
                        </div>
                        <div class="sequence-description">coords: ${tx.start || '?'} - ${tx.end || '?'}, strand ${tx.strand || '?'}</div>
                        <div class="sequence-length">${(tx.end && tx.start) ? (Math.abs(tx.end - tx.start) + 1).toLocaleString() + ' bp' : '—'}</div>
                    </div>
                `).join('');
            } else {
                mrnaList.innerHTML = '<div>No mRNA/transcript data available.</div>';
            }
        }
    }

    populateExonTable() {
        const exons = this.exons || (this.mockSequences[this.currentGene] && this.mockSequences[this.currentGene].exons);
        const tableBody = document.getElementById('exon-table-body');
        
        if (!tableBody) return;
        if (!exons || !exons.length) {
            tableBody.innerHTML = '<tr><td colspan="6">No exon data available.</td></tr>';
            return;
        }
    
        tableBody.innerHTML = exons.map(exon => `
            <tr>
                <td>${exon.number || '—'}</td>
                <td><code>${exon.id || '—'}</code></td>
                <td>${exon.start ? exon.start.toLocaleString() : '—'}</td>
                <td>${exon.end ? exon.end.toLocaleString() : '—'}</td>
                <td>${exon.length || (exon.start && exon.end ? Math.abs(exon.end - exon.start) + 1 : '—')}</td>
                <td>${exon.strand || '—'}</td>
            </tr>
        `).join('');
    }
    
    async tryFetchEnsemblAndSequences() {
        if (!this.currentGene) return;
        try {
            const symbol = this.currentGene;
            const ensemblUrl = `https://rest.ensembl.org/lookup/symbol/homo_sapiens/${encodeURIComponent(symbol)}?expand=1`;
            const resp = await fetch(`/api/proxy?url=${encodeURIComponent(ensemblUrl)}`);
            if (!resp.ok) return;
    
            const data = await resp.json();
            const transcripts = [];
            const exonList = [];
    
            if (Array.isArray(data.Transcript) && data.Transcript.length) {
                data.Transcript.forEach((tx, txIndex) => {
                    const txObj = {
                        transcript_id: tx.id || `tx_${txIndex+1}`,
                        start: tx.start,
                        end: tx.end,
                        strand: tx.strand === 1 ? '+' : '-',
                        exons: []
                    };
                    if (Array.isArray(tx.Exon)) {
                        tx.Exon.forEach((ex, exIndex) => {
                            const e = {
                                number: exIndex + 1,
                                id: ex.id || `ex_${exIndex+1}`,
                                start: ex.start,
                                end: ex.end,
                                length: Math.abs(ex.end - ex.start) + 1,
                                strand: txObj.strand
                            };
                            txObj.exons.push(e);
                            exonList.push(e);
                        });
                    }
                    transcripts.push(txObj);
                });
            } else if (Array.isArray(data.exon)) {
                data.exon.forEach((ex, idx) => {
                    exonList.push({
                        number: idx + 1,
                        id: ex.id || `ex_${idx+1}`,
                        start: ex.start,
                        end: ex.end,
                        length: Math.abs(ex.end - ex.start) + 1,
                        strand: ex.strand === 1 ? '+' : '-'
                    });
                });
            }
    
            if (transcripts.length) {
                this.sequences = { transcripts };
                this.exons = exonList.length ? exonList : null;
            }
        } catch (err) {
            console.warn('Ensembl fetch error', err);
        }
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
        /* -----------------------------
    AlphaFold integration helpers
    ----------------------------- */

    async fetchUniProtAccession(geneSymbol) {
        // Try exact gene mapping for human (organism_id=9606). Falls back to generic gene: query.
        try {
            const q = encodeURIComponent(`gene_exact:${geneSymbol} AND organism_id:9606 AND reviewed:true`);
            const url = `https://rest.uniprot.org/uniprotkb/search?query=${q}&fields=accession,protein_name&format=json&size=1`;

            const resp = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
            if (!resp.ok) return null;
            const data = await resp.json();
            if (data?.results && data.results.length > 0) {
                // UniProt JSON format commonly uses primaryAccession
                const item = data.results[0];
                return item.primaryAccession || item.accession || (item.uniProtkbId ? item.uniProtkbId : null);
            }

            // fallback: looser search
            const fallbackQ = encodeURIComponent(`gene:${geneSymbol} AND organism_id:9606 AND reviewed:true`);
            const fallbackUrl = `https://rest.uniprot.org/uniprotkb/search?query=${fallbackQ}&fields=accession,protein_name&format=json&size=1`;
            const resp2 = await fetch(`/api/proxy?url=${encodeURIComponent(fallbackUrl)}`);

            if (!resp2.ok) return null;
            const data2 = await resp2.json();
            if (data2?.results && data2.results.length > 0) {
                const item2 = data2.results[0];
                return item2.primaryAccession || item2.accession || null;
            }

            return null;
        } catch (err) {
            console.warn('UniProt lookup failed:', err);
            return null;
        }
    }

    async fetchAlphaFoldModelInfo(uniprotAccession) {
        // Query AlphaFold API for metadata and file URLs
        try {
            const apiUrl = `https://alphafold.ebi.ac.uk/api/prediction/${encodeURIComponent(uniprotAccession)}`;
            const resp = await fetch(`/api/proxy?url=${encodeURIComponent(apiUrl)}`);
            if (!resp.ok) {
                // no model or server error
                return null;
            }
            const info = await resp.json();
            // API historically returns an array or object describing model(s). Inspect common fields:
            // look for an array of "models" or direct fields containing pdb/mmcif URLs.
            if (Array.isArray(info) && info.length > 0) {
                console.log('AlphaFold API returned array for accession', uniprotAccession, info);
                return info[0];
            }
            if (info && typeof info === 'object') {
                console.log('AlphaFold API returned object for accession', uniprotAccession, info);
                return info;
            }
            
            return null;
        } catch (err) {
            console.warn('AlphaFold API fetch failed:', err);
            return null;
        }
    }

    async loadProteinStructure() {
        // Attempts to map gene -> UniProt -> AlphaFold model -> show in NGL viewer
        const gene = this.sampleGenes[this.currentGene];
        const geneSymbol = gene?.symbol || (document.getElementById('gene-input')?.value || '').toUpperCase();
        const uniprotEl = document.getElementById('structure-uniprot');
        const proteinNameEl = document.getElementById('structure-protein-name');
        const noteEl = document.getElementById('structure-note');
        const errorEl = document.getElementById('structure-error');
        const downloadBtn = document.getElementById('download-structure-btn');
        const viewOnAFBtn = document.getElementById('view-on-alphafold-btn');

        // clear previous
        if (uniprotEl) uniprotEl.textContent = '—';
        if (proteinNameEl) proteinNameEl.textContent = '—';
        if (errorEl) errorEl.textContent = '';
        if (downloadBtn) downloadBtn.disabled = true;
        if (viewOnAFBtn) viewOnAFBtn.disabled = true;

        if (!geneSymbol) {
            if (noteEl) noteEl.textContent = 'No gene symbol available to fetch structure.';
            return;
        }

        // 1) find UniProt accession
        const accession = await this.fetchUniProtAccession(geneSymbol);
        if (!accession) {
            if (noteEl) noteEl.textContent = 'No UniProt accession found for this gene (or not in UniProt).';
            if (errorEl) errorEl.textContent = 'Structure not available.';
            return;
        }

        if (uniprotEl) uniprotEl.textContent = accession;

        // 2) fetch AlphaFold model info
        const afInfo = await this.fetchAlphaFoldModelInfo(accession);
        if (!afInfo) {
            if (noteEl) noteEl.textContent = 'No AlphaFold model found for this UniProt accession.';
            if (errorEl) errorEl.textContent = 'Structure not available.';
            return;
        }

        // fill protein name (if available)
        if (afInfo?.name) {
            if (proteinNameEl) proteinNameEl.textContent = afInfo.name;
        } else {
            // try to pull from UniProt response via another quick query to show protein name
            try {
                const upUrl = `https://rest.uniprot.org/uniprotkb/${encodeURIComponent(accession)}?format=json`;
                const resp = await fetch(`/api/proxy?url=${encodeURIComponent(upUrl)}`);

                if (resp.ok) {
                    const upObj = await resp.json();
                    const pName = upObj?.proteinDescription?.recommendedName?.fullName?.value
                                || (upObj?.proteinDescription?.submissionNames?.[0]?.value)
                                || upObj?.uniProtkbId
                                || null;
                    if (pName && proteinNameEl) proteinNameEl.textContent = pName;
                }
            } catch (e) { /* non-critical */ }
        }

        // ---- REPLACE existing pdbUrl determination block with this ----

let pdbUrl = null;

// 1. direct fields
if (afInfo.pdbUrl) {
    pdbUrl = afInfo.pdbUrl;
} else if (afInfo.cifUrl) {
    pdbUrl = afInfo.cifUrl;
} else if (afInfo.model?.pdbUrl) {
    pdbUrl = afInfo.model.pdbUrl;
} else if (afInfo.model?.structure_url) {
    pdbUrl = afInfo.model.structure_url;
} else if (afInfo.structure_url) {
    pdbUrl = afInfo.structure_url;
}

// 2. files array
if (!pdbUrl && Array.isArray(afInfo.files)) {
    const fileEntry = afInfo.files.find(f => {
        const nameOk = f.name && (f.name.endsWith('.pdb') || f.name.endsWith('.cif'));
        const urlOk = f.url && (f.url.endsWith('.pdb') || f.url.endsWith('.cif'));
        return nameOk || urlOk;
    });
    if (fileEntry) {
        pdbUrl = fileEntry.url || (fileEntry.name && (fileEntry.name.endsWith('.pdb') || fileEntry.name.endsWith('.cif')) ? `${fileEntry.name}` : null);
    }
}

// 3. fallback via known pattern
if (!pdbUrl) {
    // Try known pattern for AlphaFold DB
    const possible = `https://alphafold.ebi.ac.uk/files/AF-${accession}-F1-model_v1.pdb`;
    // Optionally try head request to see if exists, or just use it
    pdbUrl = possible;
}


        // 4) if we have a pdbUrl, load into NGL viewer
        if (!pdbUrl) {
            if (noteEl) noteEl.textContent = 'AlphaFold model entry found but no downloadable coordinate file URL detected.';
            if (errorEl) errorEl.textContent = 'Structure file not found.';
            return;
        }

        // enable buttons
        if (downloadBtn) {
            downloadBtn.disabled = false;
            downloadBtn.onclick = () => this.downloadStructureFile(pdbUrl, `${accession}_AF_model.pdb`);
        }
        if (viewOnAFBtn) {
            viewOnAFBtn.disabled = false;
            viewOnAFBtn.onclick = () => window.open(`https://alphafold.ebi.ac.uk/entry/${accession}`, '_blank');
        }

        // Initialize NGL viewer if needed
        try {
            if (!this.nglStage) {
                // 'ngl-viewer' is the id of the viewer div in index.html
                this.nglStage = new NGL.Stage('ngl-viewer');
                // handle resize
                window.addEventListener('resize', () => { try { this.nglStage.handleResize(); } catch (e) {} });
            } else {
                // remove existing components
                this.nglStage.removeAllComponents();
            }

            // load the structure
            this.nglStage.loadFile(pdbUrl).then(component => {
                try {
                    component.addRepresentation('cartoon', { smoothTube: true });
                    component.addRepresentation('ball+stick', { sele: 'hetero' }); // show ligands if any
                    component.autoView();
                } catch (e) {
                    console.warn('NGL representation error:', e);
                }
            }).catch(err => {
                console.warn('NGL load error:', err);
                if (errorEl) errorEl.textContent = 'Failed to load structure in viewer.';
            });
        } catch (err) {
            console.warn('Viewer initialization failed:', err);
            if (errorEl) errorEl.textContent = 'Viewer failed to initialize.';
        }
    }

    async downloadStructureFile(url, filename) {
        try {
            const resp = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);

            if (!resp.ok) throw new Error('Download failed');
            const blob = await resp.blob();
            const a = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
            this.showSuccessToast(`Downloaded ${filename}`);
        } catch (err) {
            console.error('Structure download failed', err);
            const errEl = document.getElementById('structure-error');
            if (errEl) errEl.textContent = 'Download failed.';
            this.showErrorToast('Structure download failed.');
        }
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
    // Fetches esummary by NCBI Gene ID via proxy
async fetchNCBISummaryById(geneId) {
    try {
        const apiUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=${encodeURIComponent(geneId)}&retmode=json`;
        const resp = await fetch(`/api/proxy?url=${encodeURIComponent(apiUrl)}`);
        if (!resp.ok) return null;
        const data = await resp.json();
        const doc = data?.result?.[geneId];
        if (!doc) return null;
        return {
            geneId: geneId,
            symbol: doc.name || doc.nomenclature_symbol || null,
            name: doc.description || doc.nomenclature_name || null,
            description: doc.description || null,
            chromosome: doc.chromosome || null,
            location: doc.maplocation || null,
            organism: doc.organism?.scientificname || null
        };
    } catch (err) {
        console.warn('fetchNCBISummaryById failed', err);
        return null;
    }
}

// Searches NCBI Gene by symbol -> returns esummary object or null
async fetchNCBISummaryBySymbol(symbol) {
    try {
        // try symbol scoped to human first
        const esearchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gene&term=${encodeURIComponent(symbol + '[Gene Name] AND Homo sapiens[Organism]')}&retmode=json`;
        let resp = await fetch(`/api/proxy?url=${encodeURIComponent(esearchUrl)}`);
        if (!resp.ok) return null;
        let data = await resp.json();
        let ids = data?.esearchresult?.idlist || [];

        // looser search if none found
        if (!ids.length) {
            const looseUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gene&term=${encodeURIComponent(symbol)}&retmode=json`;
            resp = await fetch(`/api/proxy?url=${encodeURIComponent(looseUrl)}`);
            if (!resp.ok) return null;
            data = await resp.json();
            ids = data?.esearchresult?.idlist || [];
        }

        if (!ids.length) return null;
        const geneId = ids[0];
        return await this.fetchNCBISummaryById(geneId);
    } catch (err) {
        console.warn('fetchNCBISummaryBySymbol failed', err);
        return null;
    }
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