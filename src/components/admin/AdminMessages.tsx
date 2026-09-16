import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mail, 
  Trash2, 
  CheckCircle, 
  Eye, 
  Clock, 
  User, 
  Phone, 
  Briefcase, 
  DollarSign, 
  Search, 
  Inbox, 
  Reply,
  X
} from 'lucide-react';
import { ContactMessage } from '../../types';
import { Modal } from '../common/Modal';

export const AdminMessages: React.FC = () => {
  const { language, t, messages, updateMessageStatus, deleteMessage, addToast } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const filteredMessages = messages
    .filter((m) => {
      if (filter === 'unread') return m.status === 'unread';
      if (filter === 'read') return m.status !== 'unread';
      return true;
    })
    .filter((m) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.service.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    });

  const handleOpenDetail = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      updateMessageStatus(msg.id, 'read');
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(language === 'ar' ? `هل أنت متأكد من حذف رسالة "${name}"؟` : `Delete message from "${name}"?`)) {
      deleteMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      addToast('info', language === 'ar' ? 'تم الحذف' : 'Deleted', language === 'ar' ? 'تم حذف الرسالة' : 'Message deleted');
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.admin.messages}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar' ? 'صندوق الوارد لطلبات واستفسارات العملاء المحتملين' : 'Inbound inquiries and project consultation requests'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'all' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              {language === 'ar' ? 'الكل' : 'All'} ({messages.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'unread' ? 'bg-white text-rose-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              {language === 'ar' ? 'غير مقروءة' : 'Unread'} ({messages.filter((m) => m.status === 'unread').length})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'read' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              {language === 'ar' ? 'مقروءة' : 'Read'} ({messages.filter((m) => m.status !== 'unread').length})
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'ar' ? 'بحث في الرسائل...' : 'Search inbox...'}
              className="ps-8 pe-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Messages List Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="py-16 text-center">
            <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">
              {language === 'ar' ? 'لا توجد رسائل تطابق الفلتر' : 'No messages found'}
            </h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">{language === 'ar' ? 'المرسل' : 'Sender'}</th>
                  <th className="px-6 py-3.5">{language === 'ar' ? 'الخدمة والميزانية' : 'Service & Budget'}</th>
                  <th className="px-6 py-3.5">{language === 'ar' ? 'نص الرسالة' : 'Message Snippet'}</th>
                  <th className="px-6 py-3.5">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
                  <th className="px-6 py-3.5 text-end">{t.admin.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                      msg.status === 'unread' ? 'bg-indigo-50/20 font-semibold' : ''
                    }`}
                    onClick={() => handleOpenDetail(msg)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          msg.status === 'unread' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {msg.name.substring(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-slate-900 flex items-center gap-1.5">
                            <span>{msg.name}</span>
                            {msg.status === 'unread' && (
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal">{msg.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-indigo-600 font-bold">{msg.service}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{msg.budget}</div>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <p className="line-clamp-1 text-slate-600 font-normal">
                        {msg.message}
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 font-normal">
                      {msg.created_at}
                    </td>

                    <td className="px-6 py-4 text-end" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenDetail(msg)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <a
                          href={`mailto:${msg.email}?subject=Regarding your DevRopix project inquiry`}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Reply via Email"
                        >
                          <Reply className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => handleDelete(msg.id, msg.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title={t.admin.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <Modal
          isOpen={!!selectedMessage}
          onClose={() => setSelectedMessage(null)}
          title={language === 'ar' ? 'تفاصيل طلب العميل' : 'Inquiry Details'}
          maxWidth="xl"
        >
          <div className="space-y-6 text-start">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base">
                  {selectedMessage.name.substring(0, 1).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedMessage.name}</h3>
                  <div className="text-xs text-slate-500">{selectedMessage.created_at}</div>
                </div>
              </div>

              <div className="text-xs">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                  {language === 'ar' ? 'طلب جديد' : 'Active Lead'}
                </span>
              </div>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="space-y-1">
                <div className="text-slate-400 font-medium">{language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</div>
                <div className="font-bold text-slate-900">{selectedMessage.email}</div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-medium">{language === 'ar' ? 'رقم الهاتف' : 'Phone'}</div>
                <div className="font-bold text-slate-900 dir-ltr text-start">{selectedMessage.phone || '—'}</div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-medium">{language === 'ar' ? 'الشركة / المشروع' : 'Company'}</div>
                <div className="font-bold text-slate-900">{selectedMessage.company || '—'}</div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-medium">{language === 'ar' ? 'الميزانية المتوقعة' : 'Budget Scope'}</div>
                <div className="font-bold text-indigo-600">{selectedMessage.budget}</div>
              </div>
            </div>

            {/* Requested Service */}
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">{language === 'ar' ? 'الخدمة المطلوبة' : 'Requested Service'}</div>
              <div className="inline-block px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs">
                {selectedMessage.service}
              </div>
            </div>

            {/* Full Message Body */}
            <div>
              <div className="text-xs text-slate-400 font-medium mb-2">{language === 'ar' ? 'تفاصيل المشروع والرسالة' : 'Full Message / RFP Notes'}</div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {selectedMessage.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.admin.delete}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </button>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: DevRopix Project Inquiry for ${selectedMessage.service}`}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  <Reply className="w-4 h-4" />
                  <span>{language === 'ar' ? 'الرد عبر الإيميل' : 'Reply via Email'}</span>
                </a>
              </div>
            </div>

          </div>
        </Modal>
      )}
    </div>
  );
};
