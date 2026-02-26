import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import {
  TrendingUp,
  Users,
  Calendar,
  Scissors,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Star,
  Settings,
  LayoutDashboard,
  CalendarRange,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Plus,
  FileText,
  Image as ImageIcon,
  DollarSign,
  Briefcase,
  Edit3,
  Trash2,
  Lock,
  Eye,
  GripVertical,
  Settings2,
  Upload,
  Type
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [allReviews, setAllReviews] = useState<any[]>([]);
  const [allProfessionals, setAllProfessionals] = useState<any[]>([]);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [allAvailabilities, setAllAvailabilities] = useState<any[]>([]);
  const [tab, setTab] = useState<'bi' | 'agenda' | 'users' | 'blog' | 'gallery' | 'reviews' | 'config' | 'professionals'>('bi');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [promoText, setPromoText] = useState('');
  const [promoActive, setPromoActive] = useState(false);
  const [promoStyle, setPromoStyle] = useState({
    backgroundColor: '#0d2438',
    textColor: '#ffffff',
    fontWeight: 'bold',
    marquee: false,
    speed: 20
  });

  // Form states for creating items
  const [newProf, setNewProf] = useState({
    user_id: '',
    especialidade: '',
    bio: '',
    services: [] as { nome: string, duracao: number, preco: number, especialidade: string }[]
  });
  const [newAvail, setNewAvail] = useState({ professional_id: '', data: '', hora_inicio: '', hora_fim: '' });
  const [newBlock, setNewBlock] = useState({ professional_id: '', data: '', hora: '' });
  const [bulkConfig, setBulkConfig] = useState({
    professional_id: '',
    service_id: '',
    date_start: '',
    date_end: '',
    days: [] as number[],
    start_time: '08:00',
    end_time: '17:00'
  });
  const [showBulkPanel, setShowBulkPanel] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({ nome: '', email: '', telefone: '', senha: '', role: 'CLIENTE' });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [newPostData, setNewPostData] = useState({ titulo: '', conteudo: '', imagem_url: '' });
  const [blogImageSource, setBlogImageSource] = useState<'url' | 'file'>('url');

  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [newGalleryData, setNewGalleryData] = useState({ url: '', titulo: '', descricao: '' });
  const [galleryImageSource, setGalleryImageSource] = useState<'url' | 'file'>('url');

  const handleFileUpload = async (file: File) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/api/uploads/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      return res.data.url;
    } catch (error) {
      console.error("Upload error", error);
      alert("Erro ao fazer upload da imagem");
      return null;
    }
  };

  // Interactive agenda states
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + 1); // Monday
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [selectedProfFilter, setSelectedProfFilter] = useState<string>('all');
  const [agendaView, setAgendaView] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [agendaAllAppts, setAgendaAllAppts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [modalData, setModalData] = useState<any>({ professional_id: '', data: '', hora: '', service_id: '', status: 'BLOQUEADO' });
  const [dragItem, setDragItem] = useState<any>(null);

  const COLORS = ['#bda07e', '#0d2438', '#3c3c3c', '#8884d8', '#f5f1ed'];
  const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`).filter((_, i) => i >= 7 && i <= 20);
  const HALF_HOURS: string[] = [];
  for (let h = 7; h <= 20; h++) {
    HALF_HOURS.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 20) HALF_HOURS.push(`${String(h).padStart(2, '0')}:30`);
  }

  const STATUS_COLORS: Record<string, string> = {
    APROVADO: 'bg-emerald-500',
    PENDENTE: 'bg-amber-400',
    BLOQUEADO: 'bg-red-500',
    RECUSADO: 'bg-gray-400'
  };
  const STATUS_LABELS: Record<string, string> = {
    APROVADO: 'Aprovado',
    PENDENTE: 'Pendente',
    BLOQUEADO: 'Bloqueado',
    RECUSADO: 'Recusado'
  };

  const getWeekDays = useCallback(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(currentWeekStart);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  }, [currentWeekStart]);

  const navigateWeek = (dir: number) => {
    setCurrentWeekStart(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + dir * 7);
      return d;
    });
  };

  const goToToday = () => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + 1);
    d.setHours(0, 0, 0, 0);
    setCurrentWeekStart(d);
    setSelectedDay(new Date());
  };

  const formatDateKey = (d: Date | string) => {
    const date = typeof d === 'string' ? new Date(d) : d;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const fetchAgendaData = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/appointments/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgendaAllAppts(res.data);
    } catch { /* silent */ }
  }, []);

  const getApptsForSlot = (dateKey: string, horaStr: string) => {
    const slotTimeStart = new Date(`${dateKey}T${horaStr}`);

    return agendaAllAppts.filter(appt => {
      // Check date - assuming appt.data is "YYYY-MM-DD..."
      const apptDate = appt.data.split('T')[0];
      if (apptDate !== dateKey) return false;

      // Check professional
      if (selectedProfFilter !== 'all' && String(appt.professional_id) !== selectedProfFilter) return false;

      // Check duration overlap
      const apptStartTime = new Date(`${dateKey}T${appt.hora}`);
      const service = allServices.find(s => s.id === appt.service_id);
      const duration = service ? service.duracao : 30;
      const apptEndTime = new Date(apptStartTime.getTime() + duration * 60000);

      // Slot (30 min) is covered if apptStartTime <= slotTimeStart AND slotTimeStart < apptEndTime
      return slotTimeStart >= apptStartTime && slotTimeStart < apptEndTime;
    });
  };

  const getAvailForDay = (dateKey: string) => {
    return allAvailabilities.filter(a => {
      const aDate = formatDateKey(a.data);
      const matchDate = aDate === dateKey;
      const matchProf = selectedProfFilter === 'all' || String(a.professional_id) === selectedProfFilter;
      return matchDate && matchProf;
    });
  };

  const isSlotInAvailability = (dateKey: string, hora: string) => {
    const dayAvails = getAvailForDay(dateKey);
    // Availability is a range: [hora_inicio, hora_fim)
    return dayAvails.some(a => hora >= a.hora_inicio && hora < a.hora_fim);
  };

  const openCreateModal = (dateKey: string, hora: string) => {
    setModalMode('create');
    setModalData({
      professional_id: selectedProfFilter === 'all' ? '' : selectedProfFilter,
      data: dateKey,
      hora,
      service_id: '',
      cliente_id: '',
      status: 'BLOQUEADO'
    });
    setShowModal(true);
  };

  const openEditModal = (appt: any) => {
    setModalMode('edit');
    setModalData({
      id: appt.id,
      professional_id: String(appt.professional_id),
      data: new Date(appt.data).toISOString().split('T')[0],
      hora: appt.hora,
      service_id: String(appt.service_id || ''),
      cliente_id: String(appt.cliente_id || ''),
      status: appt.status,
      cliente_nome: appt.cliente_nome,
      professional_nome: appt.professional_nome,
      service_nome: appt.service_nome
    });
    setShowModal(true);
  };

  const handleModalSave = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const payload: any = {
        professional_id: parseInt(modalData.professional_id),
        service_id: parseInt(modalData.service_id) || 1,
        data: new Date(modalData.data + 'T12:00:00').toISOString(),
        hora: modalData.hora,
        status: modalData.status
      };

      if (modalData.cliente_id) {
        payload.cliente_id = parseInt(modalData.cliente_id);
      }

      if (modalMode === 'create') {
        await axios.post('/api/appointments/', payload, { headers });
      } else {
        await axios.put(`/api/appointments/${modalData.id}`, payload, { headers });
      }
      setShowModal(false);
      fetchAgendaData();
    } catch (err: any) {
      alert(err?.response?.data?.detail || 'Erro ao salvar');
    }
  };

  const handleDeleteAppt = async (id: number) => {
    if (!confirm('Excluir este agendamento?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAgendaData();
    } catch { alert('Erro ao excluir'); }
  };

  const handleBlockFullDay = async (dateKey: string) => {
    const profId = selectedProfFilter === 'all' ? '' : selectedProfFilter;
    if (!profId) { alert('Selecione um profissional para bloquear o dia'); return; }
    if (!confirm(`Bloquear todos os horários de ${new Date(dateKey + 'T12:00').toLocaleDateString('pt-BR')}?`)) return;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      for (const hora of HALF_HOURS) {
        try {
          await axios.post('/api/appointments/', {
            professional_id: parseInt(profId),
            service_id: 1,
            data: new Date(dateKey + 'T12:00:00').toISOString(),
            hora,
            status: 'BLOQUEADO'
          }, { headers });
        } catch { /* skip conflicts */ }
      }
      fetchAgendaData();
    } catch { alert('Erro ao bloquear dia'); }
  };

  const handleDrop = async (dateKey: string, hora: string) => {
    if (!dragItem) return;
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/appointments/${dragItem.id}`, {
        data: new Date(dateKey + 'T12:00:00').toISOString(),
        hora
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDragItem(null);
      fetchAgendaData();
    } catch (err: any) {
      alert(err?.response?.data?.detail || 'Erro ao mover agendamento');
      setDragItem(null);
    }
  };

  const handleBulkCreate = async () => {
    if (!bulkConfig.professional_id || !bulkConfig.date_start || !bulkConfig.date_end || bulkConfig.days.length === 0) {
      alert('Preencha os campos obrigatórios (Profissional, Datas e Dias)');
      return;
    }

    const token = localStorage.getItem('token');
    const start = new Date(bulkConfig.date_start + 'T12:00:00');
    const end = new Date(bulkConfig.date_end + 'T12:00:00');
    const availabilities = [];

    // Verificamos se há um serviço selecionado para calcular a duração dos slots
    let slotDuration = 0;
    if (bulkConfig.service_id) {
      const prof = allProfessionals.find(p => String(p.id) === bulkConfig.professional_id);
      const svc = prof?.services?.find((s: any) => String(s.id) === bulkConfig.service_id);
      if (svc) slotDuration = svc.duracao;
    }

    let current = new Date(start);
    while (current <= end) {
      if (bulkConfig.days.includes(current.getDay())) {
        if (slotDuration > 0) {
          // Gerar slots discretos
          let [h_start, m_start] = bulkConfig.start_time.split(':').map(Number);
          let [h_end, m_end] = bulkConfig.end_time.split(':').map(Number);

          let currentTimeInMins = h_start * 60 + m_start;
          const endTimeInMins = h_end * 60 + m_end;

          while (currentTimeInMins + slotDuration <= endTimeInMins) {
            const h = Math.floor(currentTimeInMins / 60);
            const m = currentTimeInMins % 60;
            const h_next = Math.floor((currentTimeInMins + slotDuration) / 60);
            const m_next = (currentTimeInMins + slotDuration) % 60;

            availabilities.push({
              professional_id: parseInt(bulkConfig.professional_id),
              data: formatDateKey(current) + 'T12:00:00',
              hora_inicio: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
              hora_fim: `${String(h_next).padStart(2, '0')}:${String(m_next).padStart(2, '0')}`
            });

            currentTimeInMins += slotDuration;
          }
        } else {
          availabilities.push({
            professional_id: parseInt(bulkConfig.professional_id),
            data: formatDateKey(current) + 'T12:00:00',
            hora_inicio: bulkConfig.start_time,
            hora_fim: bulkConfig.end_time
          });
        }
      }
      current.setDate(current.getDate() + 1);
    }

    if (availabilities.length === 0) {
      alert('Nenhuma data compatível encontrada no período');
      return;
    }

    try {
      await axios.post('/api/availability/bulk', availabilities, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Sucesso! ${availabilities.length} dias configurados.`);
      setShowBulkPanel(false);
      window.location.reload();
    } catch {
      alert('Erro ao criar horários em massa');
    }
  };


  const toggleUser = async (userId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`/api/admin/users/${userId}/toggle-active`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData(); // Using fetchData instead of reload for better UX
    } catch (error) {
      alert('Erro ao alterar status do usuário');
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`/api/admin/users/${userId}/role?role=${newRole}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      alert('Erro ao alterar cargo do usuário');
    }
  };

  const handleCreateUser = async () => {
    if (!newUserData.nome || !newUserData.email || !newUserData.senha) {
      alert('Nome, E-mail e Senha são obrigatórios');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/admin/users', newUserData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Usuário criado com sucesso!');
      setShowAddUserModal(false);
      setNewUserData({ nome: '', email: '', telefone: '', senha: '', role: 'CLIENTE' });
      fetchData();
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert('Sessão expirada. Por favor, faça login novamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        alert(error.response?.data?.detail || 'Erro ao criar usuário');
      }
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`/api/appointments/${id}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Agendamento ${status.toLowerCase()} com sucesso!`);
      fetchData();
    } catch (error) {
      alert('Erro ao atualizar status');
    }
  };

  const handleCreateAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/availability/', {
        ...newAvail,
        professional_id: parseInt(newAvail.professional_id)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Horário cadastrado com sucesso!');
      fetchData();
    } catch (error) {
      alert('Erro ao cadastrar horário');
    }
  };

  const handleDeleteAvailability = async (id: number) => {
    if (!confirm('Excluir este horário?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/availability/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      alert('Erro ao excluir horário');
    }
  };

  const handleCreateBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/appointments/', {
        ...newBlock,
        professional_id: parseInt(newBlock.professional_id),
        service_id: 1,
        data: new Date(newBlock.data + 'T12:00:00').toISOString(),
        status: 'BLOQUEADO'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Horário bloqueado com sucesso!');
      fetchData();
    } catch (error) {
      alert('Erro ao bloquear horário');
    }
  };

  const handleUpdateAppointmentStatus = async (id: number, status: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`/api/appointments/${id}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      alert('Erro ao atualizar status');
    }
  };

  const deleteAppointment = async (id: number) => {
    if (!confirm('Excluir este agendamento/bloqueio?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      alert('Erro ao excluir');
    }
  };

  const handleAddPost = async () => {
    if (!newPostData.titulo || !newPostData.conteudo) {
      alert("Título e conteúdo são obrigatórios");
      return;
    }
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    const currentUser = JSON.parse(userStr);

    try {
      await axios.post('/api/blog/', {
        ...newPostData,
        author_id: currentUser.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowAddPostModal(false);
      setNewPostData({ titulo: '', conteudo: '', imagem_url: '' });
      setBlogImageSource('url');
      fetchData();
      alert("Post criado com sucesso!");
    } catch (error) {
      console.error("Error creating post", error);
      alert("Erro ao criar post");
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("Excluir este post definitivamente?")) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      alert("Erro ao excluir post");
    }
  };

  const handleAddGalleryImage = async () => {
    if (!newGalleryData.url) {
      alert("A imagem ou URL é obrigatória");
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/gallery/', newGalleryData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowAddGalleryModal(false);
      setNewGalleryData({ url: '', titulo: '', descricao: '' });
      setGalleryImageSource('url');
      fetchData();
      alert("Imagem adicionada à galeria!");
    } catch (error) {
      console.error("Error adding gallery image", error);
      alert("Erro ao adicionar imagem");
    }
  };

  const handleDeleteGalleryImage = async (id: number) => {
    if (!confirm("Excluir esta imagem da galeria?")) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      alert("Erro ao excluir imagem");
    }
  };

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const safeFetch = async (url: string, useAuth = false) => {
      try {
        const res = await axios.get(url, useAuth ? { headers } : {});
        return res.data;
      } catch (err: any) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
        console.error(`Failed to fetch ${url}:`, err);
        return null;
      }
    };

    const [statsData, apptsData, usersData, blogData, galleryData, reviewsData, profData, servData, availData] = await Promise.all([
      safeFetch('/api/admin/dashboard', true),
      safeFetch('/api/appointments/my', true),
      safeFetch('/api/admin/users', true),
      safeFetch('/api/blog/'),
      safeFetch('/api/gallery/'),
      safeFetch('/api/reviews/?approved_only=false'),
      safeFetch('/api/professionals/'),
      safeFetch('/api/services/'),
      safeFetch('/api/availability/', true)
    ]);

    setStats(statsData || { total_appointments: 0, approval_rate: 0, services_usage: [], active_clients: 0 });
    setAppointments((apptsData || []).filter((a: any) => a.status === 'PENDENTE'));
    setUsers(usersData || []);
    setBlogPosts(blogData || []);
    setGalleryImages(galleryData || []);
    setAllReviews(reviewsData || []);
    setAllProfessionals(profData || []);
    setAllServices(servData || []);
    setAllAvailabilities(availData || []);
    fetchAgendaData();
  }, [fetchAgendaData]);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const hRes = await axios.get('/api/settings/hero_images');
        setHeroImages(JSON.parse(hRes.data.value || '[]'));
      } catch { /* ignore */ }
      try {
        const tRes = await axios.get('/api/settings/promo_text');
        setPromoText(tRes.data.value || '');
      } catch { /* ignore */ }
      try {
        const aRes = await axios.get('/api/settings/promo_active');
        setPromoActive(aRes.data.value === 'true' || aRes.data.value === true);
      } catch { /* ignore */ }
      try {
        const sRes = await axios.get('/api/settings/promo_style');
        if (sRes.data.value) setPromoStyle(JSON.parse(sRes.data.value));
      } catch { /* ignore */ }
    };

    fetchData();
    fetchSiteSettings();
  }, [fetchData]);

  const MENU_ITEMS = [
    { id: 'bi', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'agenda', label: 'Agenda', icon: <CalendarRange className="w-5 h-5" /> },
    { id: 'professionals', label: 'Profissionais', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'users', label: 'Usuários', icon: <Users className="w-5 h-5" /> },
    { id: 'blog', label: 'Blog', icon: <FileText className="w-5 h-5" /> },
    { id: 'gallery', label: 'Galeria', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'reviews', label: 'Avaliações', icon: <Star className="w-5 h-5" /> },
    { id: 'config', label: 'Ajustes', icon: <Settings className="w-5 h-5" /> },
  ];

  if (!stats) return (
    <div className="flex items-center justify-center h-screen bg-brand-light/20">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-serif text-xl text-brand-dark italic">Carregando inteligência de dados...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f1f3f5] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-[#0d2438] transition-all duration-300 flex flex-col z-50 shadow-2xl overflow-hidden`}
      >
        <div className="p-6 flex items-center gap-4 border-b border-white/5 h-24">
          <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="text-[#0d2438] w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden">
              <h1 className="text-white font-serif font-bold text-xl truncate">La Prime</h1>
              <p className="text-brand-gold text-[10px] font-black uppercase tracking-widest truncate">Painel Executivo</p>
            </div>
          )}
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${tab === item.id
                ? 'bg-brand-gold text-[#0d2438] shadow-lg shadow-brand-gold/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <div className={`${tab === item.id ? 'text-[#0d2438]' : 'text-gray-400 group-hover:text-brand-gold'} transition-colors`}>
                {item.icon}
              </div>
              {isSidebarOpen && (
                <span className="font-bold text-sm whitespace-nowrap">{item.label}</span>
              )}
              {tab === item.id && isSidebarOpen && (
                <div className="ml-auto w-1.5 h-1.5 bg-[#0d2438] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            {isSidebarOpen && <span className="font-bold text-sm">Sair do Painel</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="text-2xl font-serif font-bold text-brand-dark">
              {MENU_ITEMS.find(m => m.id === tab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-brand-gold uppercase tracking-widest">Administrador</p>
              <p className="text-sm font-bold text-gray-500">Premium Access</p>
            </div>
            <div className="w-12 h-12 bg-brand-light rounded-full border-2 border-brand-gold/20 flex items-center justify-center text-brand-dark font-black">
              AD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-10">
          {tab === 'bi' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Agendamentos', val: stats?.total_appointments || 0, icon: <Calendar />, color: 'text-brand-dark' },
                  { label: 'Taxa Aprovação', val: `\${(stats?.approval_rate || 0).toFixed(1)}%`, icon: <CheckCircle />, color: 'text-green-600' },
                  { label: 'Clientes Ativos', val: stats?.active_clients || 0, icon: <Users />, color: 'text-brand-gold' },
                  { label: 'Especialidades', val: (stats?.services_usage || []).length, icon: <Scissors />, color: 'text-purple-600' }
                ].map((kpi, i) => (
                  <div key={i} className="p-8 bg-white rounded-3xl shadow-xl border border-brand-gold/5 flex flex-col justify-between hover:scale-[1.02] transition-transform">
                    <div className="flex justify-between items-center mb-4">
                      <div className="p-3 bg-brand-light rounded-2xl text-brand-gold">
                        {React.cloneElement(kpi.icon as React.ReactElement, { className: "w-6 h-6" })}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                      <p className={`text-4xl font-serif font-bold ${kpi.color}`}>{kpi.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-gold/5">
                  <h2 className="text-2xl font-serif font-bold text-brand-dark mb-8 flex items-center gap-3">
                    <TrendingUp className="text-brand-gold w-6 h-6" />
                    Demanda por Serviço
                  </h2>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats?.services_usage || []}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fill: '#3c3c3c', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#3c3c3c', fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#f5f1ed' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="count" fill="#bda07e" radius={[10, 10, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-gold/5">
                  <h2 className="text-2xl font-serif font-bold text-brand-dark mb-8 flex items-center gap-3">
                    <TrendingUp className="text-brand-gold w-6 h-6" />
                    Distribuição de Volume
                  </h2>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats?.services_usage || []}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={8}
                          dataKey="count"
                          nameKey="name"
                        >
                          {(stats?.services_usage || []).map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '40px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl border border-brand-gold/10 overflow-hidden">
                <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-brand-dark">
                  <h2 className="text-2xl font-serif font-bold text-white">Solicitações Pendentes</h2>
                  <span className="bg-brand-gold text-brand-dark text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest">
                    {appointments.length} NOVOS AGENDAMENTOS
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-brand-light text-brand-dark text-xs uppercase font-black tracking-widest">
                      <tr>
                        <th className="px-10 py-5">Cliente</th>
                        <th className="px-10 py-5">Data & Hora</th>
                        <th className="px-10 py-5">Especialidade</th>
                        <th className="px-10 py-5">Decisão</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-sans">
                      {appointments.length === 0 ? (
                        <tr><td colSpan={4} className="px-10 py-20 text-center text-gray-400 font-serif text-xl italic">Toda a agenda está em dia.</td></tr>
                      ) : (appointments || []).map((appt: any) => (
                        <tr key={appt.id} className="hover:bg-brand-light/20 transition-colors">
                          <td className="px-10 py-6">
                            <div className="font-bold text-brand-dark">{appt.cliente_nome || `ID: \${appt.cliente_id}`}</div>
                            <div className="text-xs text-brand-gold font-sans">{appt.cliente_telefone || 'Sem telefone'}</div>
                          </td>
                          <td className="px-10 py-6 text-gray-600">
                            <span className="font-bold">{new Date(appt.data).toLocaleDateString()}</span> às {appt.hora}
                          </td>
                          <td className="px-10 py-6">
                            <div className="text-brand-gold font-bold">{appt.service_nome || `Serviço #\${appt.service_id}`}</div>
                            <div className="text-[10px] text-gray-400 font-sans uppercase tracking-widest">com {appt.professional_nome || `Prof. #\${appt.professional_id}`}</div>
                          </td>
                          <td className="px-10 py-6">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => handleStatusUpdate(appt.id, 'APROVADO')}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all shadow-md shadow-green-100 flex items-center gap-1.5"
                              >
                                <CheckCircle className="w-3 h-3" /> APROVAR
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(appt.id, 'RECUSADO')}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all shadow-md shadow-red-100 flex items-center gap-1.5"
                              >
                                <XCircle className="w-3 h-3" /> RECUSAR
                              </button>
                              {appt.cliente_telefone && (
                                <a
                                  href={`https://wa.me/55${appt.cliente_telefone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${appt.cliente_nome || 'Cliente'}, aqui é da La Prime. Seu agendamento para ${appt.service_nome || 'seu serviço'} no dia ${new Date(appt.data).toLocaleDateString()} às ${appt.hora} foi confirmado!`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all shadow-md shadow-green-100 flex items-center gap-1.5"
                                >
                                  <Shield className="w-3 h-3" /> WHATSAPP
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : tab === 'agenda' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Agenda Header & Mass Config Toggle */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white rounded-3xl shadow-xl p-6 border border-brand-gold/10">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-serif font-bold text-brand-dark flex items-center gap-3">
                    <Calendar className="text-brand-gold w-8 h-8" />
                    Agenda
                  </h2>
                  <div className="flex bg-brand-light/30 p-1 rounded-xl">
                    <button
                      onClick={() => setAgendaView('week')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black tracking-widest transition-all ${agendaView === 'week' ? 'bg-brand-dark text-white shadow-md' : 'text-gray-500 hover:text-brand-dark'}`}
                    >
                      SEMANA
                    </button>
                    <button
                      onClick={() => setAgendaView('day')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black tracking-widest transition-all ${agendaView === 'day' ? 'bg-brand-dark text-white shadow-md' : 'text-gray-500 hover:text-brand-dark'}`}
                    >
                      DIA
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowBulkPanel(!showBulkPanel)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${showBulkPanel ? 'bg-brand-gold text-white' : 'bg-brand-dark text-white hover:bg-brand-gold'}`}
                  >
                    <Settings2 className="w-4 h-4" /> Config. em Massa
                  </button>
                </div>
              </div>

              {/* Mass Config Panel */}
              {showBulkPanel && (
                <div className="bg-brand-dark text-white rounded-3xl shadow-2xl p-8 border border-white/10 animate-in slide-in-from-top-4 duration-500">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-brand-gold">Configuração em Massa</h3>
                      <p className="text-white/60 text-xs font-sans mt-1">Defina horários de trabalho para múltiplos dias de uma vez.</p>
                    </div>
                    <button onClick={() => setShowBulkPanel(false)} className="text-white/30 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gold/60 mb-2">Profissional</label>
                      <select
                        value={bulkConfig.professional_id}
                        onChange={(e) => setBulkConfig({ ...bulkConfig, professional_id: e.target.value, service_id: '' })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-gold text-sm"
                      >
                        <option value="" className="bg-brand-dark text-white">Selecione...</option>
                        {(allProfessionals || []).map(p => (
                          <option key={p.id} value={p.id} className="bg-brand-dark text-white">{p.nome}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gold/60 mb-2">Serviço (Slots)</label>
                      <select
                        value={bulkConfig.service_id}
                        onChange={(e) => setBulkConfig({ ...bulkConfig, service_id: e.target.value })}
                        disabled={!bulkConfig.professional_id}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-gold text-sm disabled:opacity-30"
                      >
                        <option value="" className="bg-brand-dark text-white">Opcional: Ver Tudo</option>
                        {(allProfessionals || []).find(p => String(p.id) === bulkConfig.professional_id)?.services?.map((s: any) => (
                          <option key={s.id} value={s.id} className="bg-brand-dark text-white">{s.nome} ({s.duracao}m)</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gold/60 mb-2">Intervalo de Datas</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="date"
                          value={bulkConfig.date_start}
                          onChange={(e) => setBulkConfig({ ...bulkConfig, date_start: e.target.value })}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-gold text-sm"
                        />
                        <span className="text-white/20">até</span>
                        <input
                          type="date"
                          value={bulkConfig.date_end}
                          onChange={(e) => setBulkConfig({ ...bulkConfig, date_end: e.target.value })}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-gold text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gold/60 mb-2">Horário (Início - Fim)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={bulkConfig.start_time}
                          onChange={(e) => setBulkConfig({ ...bulkConfig, start_time: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 outline-none focus:border-brand-gold text-sm"
                        />
                        <input
                          type="time"
                          value={bulkConfig.end_time}
                          onChange={(e) => setBulkConfig({ ...bulkConfig, end_time: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 outline-none focus:border-brand-gold text-sm"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-4">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gold/60 mb-4">Dias da Semana</label>
                      <div className="flex flex-wrap gap-3">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((name, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              const newDays = bulkConfig.days.includes(idx)
                                ? bulkConfig.days.filter(d => d !== idx)
                                : [...bulkConfig.days, idx];
                              setBulkConfig({ ...bulkConfig, days: newDays });
                            }}
                            className={`px-5 py-3 rounded-xl text-xs font-black tracking-widest transition-all border-2 ${bulkConfig.days.includes(idx) ? 'bg-brand-gold border-brand-gold text-brand-dark' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                          >
                            {name.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-4 pt-4 border-t border-white/5 flex justify-end">
                      <button
                        onClick={handleBulkCreate}
                        className="bg-brand-gold text-brand-dark px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-gold/20 flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" /> Gerar Horários em Massa
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Agenda Tab Grid Controls (Week nav & filter) */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-brand-gold/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-brand-light/30 rounded-xl p-1">
                    <button onClick={() => navigateWeek(-1)} className="p-2 hover:bg-white rounded-lg transition-colors text-brand-dark">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={goToToday} className="px-4 py-1 text-xs font-black tracking-widest text-brand-dark hover:bg-white rounded-lg transition-colors">
                      HOJE
                    </button>
                    <button onClick={() => navigateWeek(1)} className="p-2 hover:bg-white rounded-lg transition-colors text-brand-dark">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <select
                    value={selectedProfFilter}
                    onChange={(e) => setSelectedProfFilter(e.target.value)}
                    className="border-2 border-brand-light rounded-xl px-4 py-2 text-sm font-sans outline-none focus:border-brand-gold bg-white"
                  >
                    <option value="all">Todos Profissionais</option>
                    {(allProfessionals || []).map(p => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="bg-white rounded-3xl shadow-2xl border border-brand-gold/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {/* Grid Days Header */}
                    <div className="grid grid-cols-[80px_repeat(7,1fr)] bg-brand-dark text-white border-b border-white/10">
                      <div className="p-4 border-r border-white/10"></div>
                      {getWeekDays().map((date, idx) => (
                        <div
                          key={idx}
                          className={`p-4 text-center border-r border-white/10 last:border-0 ${formatDateKey(new Date()) === formatDateKey(date) ? 'bg-brand-gold/20' : ''}`}
                        >
                          <div className="text-[10px] font-black uppercase tracking-widest text-brand-gold/80 mb-1">{dayNames[date.getDay()]}</div>
                          <div className="text-xl font-serif font-bold">{date.getDate()} <span className="text-[10px] uppercase font-sans font-normal opacity-60">{monthNames[date.getMonth()].slice(0, 3)}</span></div>
                          <button
                            onClick={() => handleBlockFullDay(formatDateKey(date))}
                            className="mt-2 text-[9px] font-black tracking-tight bg-white/10 hover:bg-red-500/30 px-2 py-0.5 rounded transition-colors"
                          >
                            BLOQUEAR DIA
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Grid Body */}
                    <div className="h-[700px] overflow-y-auto relative bg-brand-light/5">
                      {HALF_HOURS.map((hora) => (
                        <div key={hora} className="grid grid-cols-[80px_repeat(7,1fr)] group">
                          {/* Time Label */}
                          <div className={`p-2 text-right text-[10px] font-black tracking-tighter text-gray-400 border-r border-gray-100 flex items-center justify-end ${hora.endsWith(':00') ? 'bg-gray-50/50' : ''}`}>
                            {hora}
                          </div>

                          {/* Day Slots */}
                          {getWeekDays().map((date, dayIdx) => {
                            const dateKey = formatDateKey(date);
                            const appts = getApptsForSlot(dateKey, hora);
                            const inAvail = isSlotInAvailability(dateKey, hora);

                            return (
                              <div
                                key={dayIdx}
                                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('bg-brand-gold/20'); }}
                                onDragLeave={(e) => e.currentTarget.classList.remove('bg-brand-gold/20')}
                                onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('bg-brand-gold/20'); handleDrop(dateKey, hora); }}
                                onClick={() => appts.length === 0 && openCreateModal(dateKey, hora)}
                                className={`min-h-[50px] border-r border-b border-gray-100/50 relative transition-all cursor-pointer group/slot ${!inAvail && appts.length === 0 ? 'bg-red-50/5' : 'hover:bg-brand-light/30'}`}
                              >
                                {!inAvail && appts.length === 0 && (
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/slot:opacity-30 pointer-events-none">
                                    <Lock className="w-3 h-3 text-red-300" />
                                  </div>
                                )}

                                {inAvail && appts.length === 0 && (
                                  <div className="absolute inset-0.5 rounded-lg border border-emerald-500/30 bg-emerald-50/40 flex flex-col items-center justify-center group-hover/slot:bg-emerald-500/10 transition-colors">
                                    <span className="text-[8px] font-black tracking-widest text-emerald-600 uppercase">Livre</span>
                                    <Plus className="w-3 h-3 text-emerald-500 mt-0.5 opacity-40 group-hover/slot:opacity-100" />
                                  </div>
                                )}

                                {appts.map((appt) => {
                                  const isFirstSlot = appt.hora === hora;
                                  if (!isFirstSlot) return null; // Only render in the first slot

                                  const service = allServices.find(s => s.id === appt.service_id);
                                  const duration = service ? service.duracao : 30;
                                  const heightFactor = duration / 30;

                                  return (
                                    <div
                                      key={appt.id}
                                      draggable
                                      onDragStart={() => setDragItem(appt)}
                                      onClick={(e) => { e.stopPropagation(); openEditModal(appt); }}
                                      style={{ height: `calc(${heightFactor * 100}% - 4px)`, zIndex: 20 }}
                                      title={`Cliente: ${appt.cliente_nome}\nServiço: ${appt.service_nome}\nProfissional: ${appt.professional_nome}\nStatus: ${appt.status}`}
                                      className={`absolute inset-x-0.5 top-0.5 rounded-lg p-1.5 shadow-sm cursor-move transition-transform hover:scale-[1.02] active:scale-95 ${STATUS_COLORS[appt.status] || 'bg-brand-dark'} overflow-hidden border border-white/20 flex flex-col`}
                                    >
                                      <div className="flex items-center gap-1 mb-0.5">
                                        <div className="flex-1 text-[10px] font-black text-white leading-tight truncate uppercase">
                                          {appt.cliente_nome || 'BLOQUEIO'}
                                        </div>
                                        <div className="flex items-center gap-1">
                                          {appt.cliente_telefone && (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                const text = `Olá ${appt.cliente_nome}, aqui é da La Prime. Confirmamos seu horário no dia ${new Date(appt.data).toLocaleDateString()} às ${appt.hora}.`;
                                                window.open(`https://wa.me/55${appt.cliente_telefone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
                                              }}
                                              className="p-1 hover:bg-white/20 rounded-md transition-colors"
                                              title="Enviar WhatsApp"
                                            >
                                              <Shield className="w-2.5 h-2.5 text-white" />
                                            </button>
                                          )}
                                          <GripVertical className="w-2.5 h-2.5 text-white/40 shrink-0" />
                                        </div>
                                      </div>
                                      <div className="text-[9px] text-white/80 truncate font-sans">
                                        {appt.service_nome || 'Ajuste Manual'}
                                      </div>
                                      <div className="mt-auto flex justify-between items-end">
                                        {appt.professional_nome && selectedProfFilter === 'all' && (
                                          <div className="text-[8px] text-brand-gold font-black uppercase truncate max-w-[60%]">
                                            {appt.professional_nome.split(' ')[0]}
                                          </div>
                                        )}
                                        <div className="text-[7px] text-white/40 font-black uppercase italic">
                                          {appt.hora}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : tab === 'users' ? (
            <div className="bg-white rounded-3xl shadow-2xl border border-brand-gold/10 overflow-hidden">
              <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-brand-dark text-white">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-serif font-bold">Base de Usuários</h2>
                  <div className="flex items-center gap-2 text-brand-gold border-l border-white/10 pl-4">
                    <Shield className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">{users.length} Registros</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="bg-brand-gold text-brand-dark px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                >
                  Novo Usuário
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-brand-light text-brand-dark text-xs uppercase font-black tracking-widest">
                    <tr>
                      <th className="px-10 py-5">Usuário</th>
                      <th className="px-10 py-5">E-mail</th>
                      <th className="px-10 py-5">Perfil/Cargo</th>
                      <th className="px-10 py-5">Status</th>
                      <th className="px-10 py-5">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-sans">
                    {(users || []).map((u: any) => (
                      <tr key={u.id} className="hover:bg-brand-light/20 transition-colors">
                        <td className="px-10 py-6">
                          <div className="font-bold text-brand-dark">{u.nome}</div>
                          <div className="text-[10px] text-gray-400 font-sans uppercase tracking-wider">{u.telefone || 'Sem telefone'}</div>
                        </td>
                        <td className="px-10 py-6 text-gray-600 text-sm">{u.email}</td>
                        <td className="px-10 py-6">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest outline-none border-2 border-transparent focus:border-brand-gold transition-all \${u.role === 'ADMIN' ? 'bg-brand-dark text-white' : u.role === 'PROFISSIONAL' ? 'bg-brand-gold text-brand-dark' : 'bg-gray-100 text-gray-600'}`}
                          >
                            <option value="CLIENTE">CLIENTE</option>
                            <option value="PROFISSIONAL">PROFISSIONAL</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>
                        <td className="px-10 py-6">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest \${u.ativo ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full \${u.ativo ? 'bg-green-600' : 'bg-red-600'}`} />
                            {u.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-10 py-6">
                          <button
                            onClick={() => toggleUser(u.id)}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all \${u.ativo ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'} shadow-md`}
                          >
                            {u.ativo ? 'SUSPENDER' : 'REATIVAR'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : tab === 'blog' ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-brand-gold/10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-gold/10 p-3 rounded-2xl">
                    <FileText className="w-8 h-8 text-brand-gold" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-brand-dark leading-none">Gestão do Blog</h2>
                    <p className="text-xs text-gray-400 mt-2 font-black uppercase tracking-widest">Informativos e Novidades</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddPostModal(true)}
                  className="bg-brand-dark text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-gold transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Novo Post
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {(blogPosts || []).length > 0 ? blogPosts.map((post: any) => (
                  <div key={post.id} className="flex flex-col md:flex-row gap-6 p-6 bg-brand-light/10 border border-brand-gold/5 rounded-3xl hover:bg-white hover:shadow-2xl transition-all group">
                    <div className="w-full md:w-48 h-32 shrink-0 bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
                      {post.imagem_url ? (
                        <img src={post.imagem_url} alt={post.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ImageIcon className="w-10 h-10" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{new Date(post.created_at).toLocaleDateString()}</span>
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        <span className="text-[10px] font-bold text-gray-400">ID: #{post.id}</span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-brand-dark mb-2">{post.titulo}</h3>
                      <p className="text-gray-500 text-sm line-clamp-1 italic">{post.conteudo}</p>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-3 text-red-400 hover:bg-red-50 rounded-2xl transition-colors shadow-sm"
                        title="Excluir Post"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                    <FileText className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-serif text-xl">Nenhum post publicado ainda.</p>
                  </div>
                )}
              </div>
            </div>
          ) : tab === 'gallery' ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-brand-gold/10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-gold/10 p-3 rounded-2xl">
                    <ImageIcon className="w-8 h-8 text-brand-gold" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-brand-dark leading-none">Galeria de Fotos</h2>
                    <p className="text-xs text-gray-400 mt-2 font-black uppercase tracking-widest">Visual da Unidade e Tratamentos</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddGalleryModal(true)}
                  className="bg-brand-dark text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-gold transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Foto
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {(galleryImages || []).length > 0 ? galleryImages.map((img: any) => (
                  <div key={img.id} className="relative group aspect-square rounded-3xl overflow-hidden shadow-lg border border-white hover:z-10 transition-all duration-500 hover:scale-105">
                    <img src={img.url} alt={img.titulo} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <p className="text-white font-bold text-xs truncate mb-1">{img.titulo}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] text-gray-400 uppercase tracking-widest">{new Date(img.uploaded_at).toLocaleDateString()}</span>
                        <button
                          onClick={() => handleDeleteGalleryImage(img.id)}
                          className="bg-red-500/20 hover:bg-red-500 text-white p-1.5 rounded-xl transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                    <ImageIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-serif text-xl">Galeria vazia.</p>
                  </div>
                )}
              </div>
            </div>
          ) : tab === 'reviews' ? (
            <div className="bg-white rounded-3xl shadow-xl border border-brand-gold/10 overflow-hidden">
              <div className="px-10 py-8 bg-brand-dark text-white flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold">Moderação de Depoimentos</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-brand-light text-brand-dark text-xs uppercase font-black tracking-widest">
                    <tr>
                      <th className="px-10 py-5">Cliente</th>
                      <th className="px-10 py-5">Nota</th>
                      <th className="px-10 py-5">Comentário</th>
                      <th className="px-10 py-5">Status</th>
                      <th className="px-10 py-5">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-sans">
                    {(allReviews || []).map((rev: any) => (
                      <tr key={rev.id} className="hover:bg-brand-light/20 transition-colors">
                        <td className="px-10 py-6 font-bold text-brand-dark">{rev.nome_cliente}</td>
                        <td className="px-10 py-6 text-brand-gold font-bold">{rev.rating}/5</td>
                        <td className="px-10 py-6 text-gray-600 max-w-xs truncate">{rev.comentario}</td>
                        <td className="px-10 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest \${rev.is_approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {rev.is_approved ? 'APROVADO' : 'PENDENTE'}
                          </span>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex gap-2">
                            {!rev.is_approved && (
                              <button
                                onClick={async () => {
                                  await axios.patch(`/api/reviews/\${rev.id}/approve`);
                                  fetchData();
                                }}
                                className="text-green-600 hover:text-green-800 font-bold text-xs"
                              >
                                Aprovar
                              </button>
                            )}
                            <button
                              onClick={async () => {
                                await axios.delete(`/api/reviews/\${rev.id}`);
                                fetchData();
                              }}
                              className="text-red-500 hover:text-red-700 font-bold text-xs"
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : tab === 'config' ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-brand-gold/10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-brand-dark">Configurações do Site</h2>
                <div className="flex items-center gap-3 bg-brand-light/20 px-4 py-2 rounded-2xl">
                  <span className="text-xs font-bold text-brand-dark uppercase tracking-widest">Faixa de Promoção</span>
                  <button
                    onClick={() => setPromoActive(!promoActive)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${promoActive ? 'bg-brand-gold' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${promoActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Promo Banner Settings */}
                <div className="space-y-6">
                  <div className="bg-brand-light/10 p-6 rounded-3xl border border-brand-gold/5">
                    <h3 className="text-lg font-serif font-bold text-brand-dark mb-4 flex items-center gap-2">
                      <Plus className="w-5 h-5 text-brand-gold" />
                      Faixa de Promoção
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Texto da Faixa</label>
                        <textarea
                          value={promoText}
                          onChange={(e) => setPromoText(e.target.value)}
                          className="w-full border-2 border-brand-light rounded-xl px-4 py-3 focus:border-brand-gold outline-none font-sans h-20 italic"
                          placeholder="Ex: 🎉 Promoção de Verão: 20% OFF em todos os tratamentos a laser!"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Cor de Fundo</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={promoStyle.backgroundColor}
                              onChange={(e) => setPromoStyle({ ...promoStyle, backgroundColor: e.target.value })}
                              className="w-10 h-10 rounded-lg cursor-pointer border-2 border-brand-light p-1"
                            />
                            <input
                              type="text"
                              value={promoStyle.backgroundColor}
                              onChange={(e) => setPromoStyle({ ...promoStyle, backgroundColor: e.target.value })}
                              className="flex-grow text-xs font-mono border-2 border-brand-light rounded-lg px-2"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Cor do Texto</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={promoStyle.textColor}
                              onChange={(e) => setPromoStyle({ ...promoStyle, textColor: e.target.value })}
                              className="w-10 h-10 rounded-lg cursor-pointer border-2 border-brand-light p-1"
                            />
                            <input
                              type="text"
                              value={promoStyle.textColor}
                              onChange={(e) => setPromoStyle({ ...promoStyle, textColor: e.target.value })}
                              className="flex-grow text-xs font-mono border-2 border-brand-light rounded-lg px-2"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-brand-light">
                        <div className="flex items-center gap-2">
                          <Type className="w-4 h-4 text-brand-gold" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark">Negrito</span>
                        </div>
                        <button
                          onClick={() => setPromoStyle({ ...promoStyle, fontWeight: promoStyle.fontWeight === 'bold' ? 'normal' : 'bold' })}
                          className={`w-10 h-5 rounded-full p-0.5 transition-colors ${promoStyle.fontWeight === 'bold' ? 'bg-brand-dark' : 'bg-gray-200'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${promoStyle.fontWeight === 'bold' ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </button>
                      </div>

                      <div className="space-y-3 p-3 bg-white rounded-xl border border-brand-light">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-brand-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark">Efeito Letreiro</span>
                          </div>
                          <button
                            onClick={() => setPromoStyle({ ...promoStyle, marquee: !promoStyle.marquee })}
                            className={`w-10 h-5 rounded-full p-0.5 transition-colors ${promoStyle.marquee ? 'bg-brand-gold' : 'bg-gray-200'}`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${promoStyle.marquee ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </button>
                        </div>
                        {promoStyle.marquee && (
                          <div className="pt-2 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[9px] font-black uppercase text-gray-400">Velocidade</label>
                              <span className="text-[9px] font-mono font-bold text-brand-gold">{promoStyle.speed}s</span>
                            </div>
                            <input
                              type="range"
                              min="5"
                              max="60"
                              step="5"
                              value={promoStyle.speed}
                              onChange={(e) => setPromoStyle({ ...promoStyle, speed: parseInt(e.target.value) })}
                              className="w-full accent-brand-gold"
                            />
                            <p className="text-[8px] text-gray-400 italic mt-1 text-center">Menos segundos = Mais rápido</p>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={async () => {
                          try {
                            await axios.put('/api/settings/promo_text', { value: promoText });
                            await axios.put('/api/settings/promo_active', { value: String(promoActive) });
                            await axios.put('/api/settings/promo_style', { value: JSON.stringify(promoStyle) });
                            alert('Configuração salva com sucesso!');
                          } catch {
                            alert('Erro ao salvar configuração.');
                          }
                        }}
                        className="w-full bg-brand-dark text-white font-bold py-3 rounded-xl hover:bg-brand-gold transition-colors shadow-lg"
                      >
                        Salvar Promoção
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hero Carousel Settings */}
                <div className="space-y-6">
                  <div className="bg-brand-light/10 p-6 rounded-3xl border border-brand-gold/5">
                    <h3 className="text-lg font-serif font-bold text-brand-dark mb-4 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-brand-gold" />
                      Carrossel do Hero
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Anexar Nova Foto</label>
                        <div className="flex gap-2">
                          <label className="flex-grow flex items-center justify-center gap-3 border-2 border-dashed border-brand-light rounded-xl px-4 py-3 hover:border-brand-gold hover:bg-white cursor-pointer transition-all group">
                            <Upload className="w-5 h-5 text-gray-400 group-hover:text-brand-gold" />
                            <span className="text-xs font-bold text-gray-500 group-hover:text-brand-dark">Escolher arquivo...</span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const formData = new FormData();
                                  formData.append('file', file);
                                  try {
                                    const res = await axios.post('/api/settings/upload-hero', formData, {
                                      headers: { 'Content-Type': 'multipart/form-data' }
                                    });
                                    setHeroImages(res.data.all_images);
                                  } catch {
                                    alert('Erro ao fazer upload da imagem.');
                                  }
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                        {(heroImages || []).map((url, idx) => (
                          <div key={idx} className="flex gap-3 items-center bg-white p-2 rounded-xl border border-brand-light group">
                            <div className="w-14 h-14 relative shrink-0">
                              <img src={url} className="w-full h-full object-cover rounded-lg" alt="Preview" />
                              <div className="absolute top-0 right-0 bg-brand-gold text-brand-dark text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-bl-lg rounded-tr-lg">
                                {idx + 1}
                              </div>
                            </div>
                            <div className="flex-grow overflow-hidden">
                              <p className="text-[9px] font-bold text-brand-dark truncate">Imagem {idx + 1}</p>
                              <p className="text-[8px] truncate text-gray-400 font-mono italic">{url}</p>
                            </div>
                            <button
                              onClick={() => setHeroImages(heroImages.filter((_, i) => i !== idx))}
                              className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={async () => {
                          try {
                            await axios.put('/api/settings/hero_images', { value: JSON.stringify(heroImages) });
                            alert('Lista do Carrossel atualizada!');
                          } catch {
                            alert('Erro ao salvar carrossel.');
                          }
                        }}
                        className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded-xl hover:bg-brand-dark hover:text-white transition-colors shadow-lg"
                      >
                        Salvar Ordem e Lista
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : tab === 'professionals' ? (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-brand-gold/10">
                <h2 className="text-3xl font-serif font-bold text-brand-dark mb-8">Novo Profissional</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Usuário Registrado</label>
                    <select
                      value={newProf.user_id}
                      onChange={(e) => setNewProf({ ...newProf, user_id: e.target.value })}
                      required
                      className="w-full border-2 border-brand-light rounded-xl px-5 py-3 focus:border-brand-gold outline-none font-sans bg-white"
                    >
                      <option value="">Selecione um usuário...</option>
                      {(users || []).map(u => (
                        <option key={u.id} value={u.id}>{u.nome} ({u.email})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Especialidade</label>
                    <input
                      type="text"
                      value={newProf.especialidade}
                      onChange={(e) => setNewProf({ ...newProf, especialidade: e.target.value })}
                      placeholder="Ex: Esteticista"
                      className="w-full border-2 border-brand-light rounded-xl px-5 py-3 focus:border-brand-gold outline-none font-sans"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Serviços Prestados</label>
                  <div className="space-y-4 bg-brand-light/20 p-6 rounded-2xl border border-brand-gold/10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input
                        type="text"
                        id="svc-nome"
                        placeholder="Nome do Serviço"
                        className="bg-white border-2 border-brand-light rounded-xl px-4 py-2 outline-none focus:border-brand-gold"
                      />
                      <input
                        type="number"
                        id="svc-duracao"
                        placeholder="Duração (min)"
                        className="bg-white border-2 border-brand-light rounded-xl px-4 py-2 outline-none focus:border-brand-gold"
                      />
                      <input
                        type="number"
                        id="svc-preco"
                        placeholder="Preço (R$)"
                        className="bg-white border-2 border-brand-light rounded-xl px-4 py-2 outline-none focus:border-brand-gold"
                      />
                      <button
                        onClick={() => {
                          const nome = (document.getElementById('svc-nome') as HTMLInputElement).value;
                          const duracao = (document.getElementById('svc-duracao') as HTMLInputElement).value;
                          const preco = (document.getElementById('svc-preco') as HTMLInputElement).value;
                          if (!nome || !duracao || !preco) return;

                          setNewProf({
                            ...newProf,
                            services: [...newProf.services, {
                              nome,
                              duracao: parseInt(duracao),
                              preco: parseFloat(preco),
                              especialidade: newProf.especialidade || 'Geral',
                              professional_id: 0 // Will be set by backend
                            } as any]
                          });

                          (document.getElementById('svc-nome') as HTMLInputElement).value = '';
                          (document.getElementById('svc-duracao') as HTMLInputElement).value = '';
                          (document.getElementById('svc-preco') as HTMLInputElement).value = '';
                        }}
                        className="bg-brand-gold text-brand-dark rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                      >
                        Adicionar à Lista
                      </button>
                    </div>

                    {newProf.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {(newProf.services || []).map((s, idx) => (
                          <div key={idx} className="bg-brand-dark text-white px-3 py-1.5 rounded-lg flex items-center gap-2 group">
                            <span className="text-[10px] font-bold">{s.nome} ({s.duracao} min) - R${s.preco}</span>
                            <button
                              onClick={() => setNewProf({ ...newProf, services: newProf.services.filter((_, i) => i !== idx) })}
                              className="text-white/40 hover:text-red-400"
                            >
                              <XCircle className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Bio / Descrição</label>
                  <textarea
                    value={newProf.bio}
                    onChange={(e) => setNewProf({ ...newProf, bio: e.target.value })}
                    className="w-full border-2 border-brand-light rounded-xl px-5 py-3 focus:border-brand-gold outline-none font-sans h-24"
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={async () => {
                      const token = localStorage.getItem('token');
                      try {
                        await axios.post('/api/professionals/', newProf, {
                          headers: { Authorization: `Bearer ${token}` }
                        });
                        alert('Profissional cadastrado com sucesso!');
                        window.location.reload();
                      } catch (error) {
                        alert('Erro ao cadastrar profissional');
                      }
                    }}
                    className="bg-brand-dark text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-gold transition-colors shadow-lg shadow-brand-dark/20"
                  >
                    Salvar Profissional Completo
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl border border-brand-gold/10 overflow-hidden">
                <div className="px-10 py-8 border-b border-gray-100 bg-brand-dark text-white">
                  <h2 className="text-2xl font-serif font-bold">Profissionais e Seus Serviços</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-brand-light text-brand-dark text-xs uppercase font-black tracking-widest">
                      <tr>
                        <th className="px-10 py-5">Nome</th>
                        <th className="px-10 py-5">Especialidade</th>
                        <th className="px-10 py-5">Serviços</th>
                        <th className="px-10 py-5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-sans">
                      {(allProfessionals || []).map((p) => (
                        <tr key={p.id} className="hover:bg-brand-light/10 transition-colors">
                          <td className="px-10 py-6 font-bold text-brand-dark">{p.nome || `Prof. #${p.id}`}</td>
                          <td className="px-10 py-6 text-sm">{p.especialidade}</td>
                          <td className="px-10 py-6">
                            <div className="flex flex-wrap gap-1 max-w-sm">
                              {p.services?.map((s: any) => (
                                <span key={s.id} className="px-2 py-0.5 bg-brand-light text-brand-dark rounded text-[8px] font-black uppercase">
                                  {s.nome}
                                </span>
                              ))}
                              {(!p.services || p.services.length === 0) && <span className="text-gray-400 italic text-[10px]">Sem serviços</span>}
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black">ATIVO</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* Modal de Agendamento/Bloqueio */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden border border-brand-gold/20 flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 bg-brand-dark text-white relative">
              <h3 className="text-2xl font-serif font-bold">
                {modalMode === 'create' ? 'Novo Agendamento/Bloqueio' : 'Editar Item'}
              </h3>
              <p className="text-brand-gold text-xs font-black uppercase tracking-widest mt-1">
                {new Date(modalData.data + 'T12:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} às {modalData.hora}
              </p>
              <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Profissional</label>
                  <select
                    value={modalData.professional_id}
                    onChange={(e) => setModalData({ ...modalData, professional_id: e.target.value })}
                    className="w-full border-2 border-brand-light rounded-2xl px-4 py-3 focus:border-brand-gold outline-none font-sans text-sm bg-white"
                  >
                    <option value="">Selecione...</option>
                    {(allProfessionals || []).map(p => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Status</label>
                  <select
                    value={modalData.status}
                    onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
                    className="w-full border-2 border-brand-light rounded-2xl px-4 py-3 focus:border-brand-gold outline-none font-sans text-sm bg-white"
                  >
                    {Object.entries(STATUS_LABELS).map(([val, lab]) => (
                      <option key={val} value={val}>{lab}</option>
                    ))}
                  </select>
                </div>
              </div>

              {modalData.status !== 'BLOQUEADO' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Serviço</label>
                    <select
                      value={modalData.service_id}
                      onChange={(e) => setModalData({ ...modalData, service_id: e.target.value })}
                      className="w-full border-2 border-brand-light rounded-2xl px-4 py-3 focus:border-brand-gold outline-none font-sans text-sm bg-white"
                    >
                      <option value="">Selecione...</option>
                      {(allServices || []).map(s => (
                        <option key={s.id} value={s.id}>{s.nome} (R$ {s.preco})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Cliente</label>
                    <select
                      value={modalData.cliente_id}
                      onChange={(e) => setModalData({ ...modalData, cliente_id: e.target.value })}
                      className="w-full border-2 border-brand-light rounded-2xl px-4 py-3 focus:border-brand-gold outline-none font-sans text-sm bg-white"
                    >
                      <option value="">Selecione...</option>
                      {(users || []).map(u => (
                        <option key={u.id} value={u.id}>{u.nome}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {modalMode === 'edit' && modalData.cliente_nome && (
                <div className="bg-brand-light/20 p-4 rounded-2xl border border-brand-gold/10">
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1">Cliente</div>
                  <div className="font-serif font-bold text-brand-dark">{modalData.cliente_nome}</div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                {modalMode === 'edit' && (
                  <button
                    onClick={() => { handleDeleteAppt(modalData.id); setShowModal(false); }}
                    className="flex-1 bg-red-50 text-red-600 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> EXCLUIR
                  </button>
                )}
                <button
                  onClick={handleModalSave}
                  className="flex-[2] bg-brand-dark text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-gold transition-all shadow-xl shadow-brand-dark/10 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> {modalMode === 'create' ? 'CRIAR ITEM' : 'SALVAR ALTERAÇÕES'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Adicionar Usuário */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-md overflow-hidden border border-brand-gold/20 flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 bg-brand-dark text-white relative">
              <h3 className="text-2xl font-serif font-bold italic">Novo Registro de Usuário</h3>
              <p className="text-brand-gold text-[10px] font-black uppercase tracking-widest mt-1">Manual Admin Entry</p>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nome Completo</label>
                <input
                  type="text"
                  value={newUserData.nome}
                  onChange={(e) => setNewUserData({ ...newUserData, nome: e.target.value })}
                  className="w-full bg-brand-light/30 border-2 border-transparent focus:border-brand-gold rounded-2xl px-6 py-3.5 outline-none font-sans text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">E-mail</label>
                  <input
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    className="w-full bg-brand-light/30 border-2 border-transparent focus:border-brand-gold rounded-2xl px-6 py-3.5 outline-none font-sans text-sm transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Telefone</label>
                  <input
                    type="tel"
                    value={newUserData.telefone}
                    onChange={(e) => setNewUserData({ ...newUserData, telefone: e.target.value })}
                    className="w-full bg-brand-light/30 border-2 border-transparent focus:border-brand-gold rounded-2xl px-6 py-3.5 outline-none font-sans text-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Senha Provisória</label>
                <input
                  type="password"
                  value={newUserData.senha}
                  onChange={(e) => setNewUserData({ ...newUserData, senha: e.target.value })}
                  className="w-full bg-brand-light/30 border-2 border-transparent focus:border-brand-gold rounded-2xl px-6 py-3.5 outline-none font-sans text-sm transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Perfil de Acesso</label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                  className="w-full bg-brand-light/30 border-2 border-transparent focus:border-brand-gold rounded-2xl px-6 py-3.5 outline-none font-sans text-sm transition-all appearance-none"
                >
                  <option value="CLIENTE">CLIENTE</option>
                  <option value="PROFISSIONAL">PROFISSIONAL</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <button
                onClick={handleCreateUser}
                className="w-full bg-brand-dark text-white rounded-2xl py-4 font-black text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all shadow-xl shadow-brand-dark/20 mt-4"
              >
                Confirmar Cadastro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo Post Blog */}
      {showAddPostModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden border border-brand-gold/20 flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 bg-brand-dark text-white relative">
              <h3 className="text-2xl font-serif font-bold italic">Criar Novo Post</h3>
              <p className="text-brand-gold text-[10px] font-black uppercase tracking-widest mt-1">Conteúdo para o Blog La Prime</p>
              <button onClick={() => setShowAddPostModal(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Título do Post</label>
                <input
                  type="text"
                  value={newPostData.titulo}
                  onChange={(e) => setNewPostData({ ...newPostData, titulo: e.target.value })}
                  className="w-full bg-brand-light/30 border-2 border-transparent focus:border-brand-gold rounded-2xl px-6 py-3.5 outline-none font-sans text-sm transition-all"
                  placeholder="Ex: 5 Dicas para manter sua pele radiante"
                />
              </div>
              <div className="space-y-4">
                <div className="flex bg-brand-light/50 p-1 rounded-2xl border border-brand-gold/10">
                  <button
                    onClick={() => setBlogImageSource('url')}
                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${blogImageSource === 'url' ? 'bg-brand-gold text-brand-dark shadow-md' : 'text-gray-400'}`}
                  >
                    URL Externa
                  </button>
                  <button
                    onClick={() => setBlogImageSource('file')}
                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${blogImageSource === 'file' ? 'bg-brand-gold text-brand-dark shadow-md' : 'text-gray-400'}`}
                  >
                    Anexar Arquivo
                  </button>
                </div>

                {blogImageSource === 'url' ? (
                  <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">URL da Imagem de Capa</label>
                    <input
                      type="text"
                      value={newPostData.imagem_url}
                      onChange={(e) => setNewPostData({ ...newPostData, imagem_url: e.target.value })}
                      className="w-full bg-brand-light/30 border-2 border-transparent focus:border-brand-gold rounded-2xl px-6 py-3.5 outline-none font-sans text-sm transition-all"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                ) : (
                  <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Upload da Imagem</label>
                    <label className="flex items-center justify-center gap-3 border-2 border-dashed border-brand-light rounded-2xl px-6 py-4 hover:border-brand-gold hover:bg-brand-light/10 cursor-pointer transition-all group">
                      <Upload className={`w-5 h-5 ${newPostData.imagem_url ? 'text-brand-gold' : 'text-gray-400'} group-hover:text-brand-gold`} />
                      <span className="text-sm font-bold text-gray-500 group-hover:text-brand-dark truncate max-w-[200px]">
                        {newPostData.imagem_url ? 'Imagem Selecionada' : 'Escolher arquivo...'}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleFileUpload(file);
                            if (url) setNewPostData({ ...newPostData, imagem_url: url });
                          }
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Conteúdo do Post</label>
                <textarea
                  value={newPostData.conteudo}
                  onChange={(e) => setNewPostData({ ...newPostData, conteudo: e.target.value })}
                  className="w-full bg-brand-light/30 border-2 border-transparent focus:border-brand-gold rounded-2xl px-6 py-3.5 outline-none font-sans text-sm transition-all h-48"
                  placeholder="Escreva aqui o conteúdo do seu post..."
                />
              </div>
              <button
                onClick={handleAddPost}
                className="w-full bg-brand-dark text-white rounded-2xl py-4 font-black text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all shadow-xl shadow-brand-dark/20 mt-4"
              >
                Publicar Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Adicionar Foto na Galeria */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-md overflow-hidden border border-brand-gold/20 flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 bg-brand-dark text-white relative">
              <h3 className="text-2xl font-serif font-bold italic">Adicionar Foto</h3>
              <p className="text-brand-gold text-[10px] font-black uppercase tracking-widest mt-1">Expansão da Galeria</p>
              <button onClick={() => setShowAddGalleryModal(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-4">
              <div className="space-y-4">
                <div className="flex bg-brand-light/50 p-1 rounded-2xl border border-brand-gold/10">
                  <button
                    onClick={() => setGalleryImageSource('url')}
                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${galleryImageSource === 'url' ? 'bg-brand-gold text-brand-dark shadow-md' : 'text-gray-400'}`}
                  >
                    URL Externa
                  </button>
                  <button
                    onClick={() => setGalleryImageSource('file')}
                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${galleryImageSource === 'file' ? 'bg-brand-gold text-brand-dark shadow-md' : 'text-gray-400'}`}
                  >
                    Anexar Arquivo
                  </button>
                </div>

                {galleryImageSource === 'url' ? (
                  <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">URL da Imagem</label>
                    <input
                      type="text"
                      value={newGalleryData.url}
                      onChange={(e) => setNewGalleryData({ ...newGalleryData, url: e.target.value })}
                      className="w-full bg-brand-light/30 border-2 border-transparent focus:border-brand-gold rounded-2xl px-6 py-3.5 outline-none font-sans text-sm transition-all"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                ) : (
                  <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Upload da Imagem</label>
                    <label className="flex items-center justify-center gap-3 border-2 border-dashed border-brand-light rounded-2xl px-6 py-4 hover:border-brand-gold hover:bg-brand-light/10 cursor-pointer transition-all group">
                      <Upload className={`w-5 h-5 ${newGalleryData.url ? 'text-brand-gold' : 'text-gray-400'} group-hover:text-brand-gold`} />
                      <span className="text-sm font-bold text-gray-500 group-hover:text-brand-dark truncate max-w-[200px]">
                        {newGalleryData.url ? 'Imagem Selecionada' : 'Escolher arquivo...'}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleFileUpload(file);
                            if (url) setNewGalleryData({ ...newGalleryData, url });
                          }
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Título (Opcional)</label>
                <input
                  type="text"
                  value={newGalleryData.titulo}
                  onChange={(e) => setNewGalleryData({ ...newGalleryData, titulo: e.target.value })}
                  className="w-full bg-brand-light/30 border-2 border-transparent focus:border-brand-gold rounded-2xl px-6 py-3.5 outline-none font-sans text-sm transition-all"
                  placeholder="Ex: Nossa recepção"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Descrição (Opcional)</label>
                <input
                  type="text"
                  value={newGalleryData.descricao}
                  onChange={(e) => setNewGalleryData({ ...newGalleryData, descricao: e.target.value })}
                  className="w-full bg-brand-light/30 border-2 border-transparent focus:border-brand-gold rounded-2xl px-6 py-3.5 outline-none font-sans text-sm transition-all"
                  placeholder="Ex: Ambiente climatizado e confortável"
                />
              </div>
              <button
                onClick={handleAddGalleryImage}
                className="w-full bg-brand-dark text-white rounded-2xl py-4 font-black text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all shadow-xl shadow-brand-dark/20 mt-4"
              >
                Salvar na Galeria
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

